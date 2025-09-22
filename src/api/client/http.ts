import type { ZodSchema } from 'zod';
import { API_URL, API_TIMEOUT_MS, RETRY_STATUSES } from './config';
import { ApiError } from './errors';
import { getAuthToken, onUnauthorized } from './interceptors';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

export type HttpOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
  retries?: number; // tylko dla GET/HEAD
  authToken?: string | null;
  /** Wysyłaj cookies/poświadczenia? Domyślnie NIE (żeby uniknąć CORS-u). */
  withCredentials?: boolean;
};

const toQuery = (q?: HttpOptions['query']) =>
  q
    ? '?' +
      Object.entries(q)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&')
    : '';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchWithTimeout(url: string, init: RequestInit, timeout: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...init,
      signal: init.signal ?? controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function parseBody<T>(res: Response): Promise<T> {
  if (res.status === 204) return null as unknown as T;
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return (await res.json()) as T;
  const text = await res.text();
  return text as unknown as T;
}

export async function request<T>(
  path: string,
  opts: HttpOptions = {},
  schema?: ZodSchema<T>,
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    query,
    body,
    signal,
    timeoutMs = API_TIMEOUT_MS,
    retries = 2,
    authToken,
    withCredentials = false,
  } = opts;

  const url = `${API_URL}${path}${toQuery(query)}`;

  const finalHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    ...(headers || {}),
  };

  const token = authToken ?? getAuthToken();
  if (token) finalHeaders.Authorization = `Bearer ${token}`;

  const init: RequestInit = {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: withCredentials ? 'include' : 'omit',
    signal,
  };

  const isIdempotent = method === 'GET' || method === 'HEAD';
  let attempt = 0;
  const base = 300;

  // Retry/backoff dla GET/HEAD
  while (true) {
    try {
      const res = await fetchWithTimeout(url, init, timeoutMs);
      if (!res.ok) {
        if (res.status === 401) await onUnauthorized();
        if (isIdempotent && RETRY_STATUSES.has(res.status) && attempt < retries) {
          attempt += 1;
          await delay(base * 2 ** (attempt - 1));
          continue;
        }
        throw await ApiError.fromResponse(res);
      }

      const data = await parseBody<T>(res);
      if (schema) {
        const parsed = schema.safeParse(data);
        if (!parsed.success) {
          throw new ApiError('Response validation failed', {
            status: res.status,
            details: parsed.error.flatten(),
          });
        }
        return parsed.data;
      }
      return data;
    } catch (e: unknown) {
      // Abort/timeout
      if (typeof e === 'object' && e !== null && 'name' in e && (e as any).name === 'AbortError') {
        throw new ApiError('Request was aborted or timed out', {
          isAbort: true,
          isTimeout: true,
          retriable: isIdempotent && attempt < retries,
        });
      }
      if (e instanceof ApiError) throw e;
      if (isIdempotent && attempt < retries) {
        attempt += 1;
        await delay(base * 2 ** (attempt - 1));
        continue;
      }
      throw new ApiError(
        typeof e === 'object' &&
        e !== null &&
        'message' in e &&
        typeof (e as any).message === 'string'
          ? (e as any).message
          : 'Network error',
        { isNetwork: true, retriable: false },
      );
    }
  }
}

export const apiClient = {
  request,
  get: <T>(p: string, o?: Omit<HttpOptions, 'method'>, s?: ZodSchema<T>) =>
    request<T>(p, { ...o, method: 'GET' }, s),
  post: <T>(p: string, o?: Omit<HttpOptions, 'method'>, s?: ZodSchema<T>) =>
    request<T>(p, { ...o, method: 'POST' }, s),
  put: <T>(p: string, o?: Omit<HttpOptions, 'method'>, s?: ZodSchema<T>) =>
    request<T>(p, { ...o, method: 'PUT' }, s),
  patch: <T>(p: string, o?: Omit<HttpOptions, 'method'>, s?: ZodSchema<T>) =>
    request<T>(p, { ...o, method: 'PATCH' }, s),
  delete: <T>(p: string, o?: Omit<HttpOptions, 'method'>, s?: ZodSchema<T>) =>
    request<T>(p, { ...o, method: 'DELETE' }, s),
};
