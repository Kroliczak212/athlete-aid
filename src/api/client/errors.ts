export class ApiError<T = unknown> extends Error {
  name = 'ApiError';
  status: number | null;
  code?: string;
  details?: T;
  isNetwork: boolean;
  isTimeout: boolean;
  isAbort: boolean;
  retriable: boolean;

  constructor(
    message: string,
    opts: {
      status?: number | null;
      code?: string;
      details?: T;
      isNetwork?: boolean;
      isTimeout?: boolean;
      isAbort?: boolean;
      retriable?: boolean;
    } = {},
  ) {
    super(message);
    this.status = opts.status ?? null;
    this.code = opts.code;
    this.details = opts.details;
    this.isNetwork = !!opts.isNetwork;
    this.isTimeout = !!opts.isTimeout;
    this.isAbort = !!opts.isAbort;
    this.retriable = !!opts.retriable;
  }

  static async fromResponse(res: Response): Promise<ApiError> {
    type ErrorPayload = { message?: string; error?: string; [k: string]: unknown };
    const isRecord = (v: unknown): v is Record<string, unknown> =>
      typeof v === 'object' && v !== null;

    let payload: unknown = null;
    try {
      const ct = res.headers.get('content-type') || '';
      payload = ct.includes('application/json') ? await res.json() : await res.text();
    } catch {
      /* ignore */
    }

    const obj = isRecord(payload) ? (payload as ErrorPayload) : undefined;

    const msg = obj?.message ?? obj?.error ?? res.statusText ?? 'Request failed';

    return new ApiError(msg, {
      status: res.status,
      details: payload ?? undefined,
      retriable: [408, 425, 429, 500, 502, 503, 504].includes(res.status),
    });
  }
}
