// src/api/client/interceptors.ts
let authTokenGetter: (() => string | null | undefined) | null = null;
let authTokenSetter: ((token: string | null, tokenType?: string) => void) | null = null;
let unauthorizedHandler: (() => void | Promise<void>) | null = null;

export function setAuthTokenGetter(fn: () => string | null | undefined) {
  authTokenGetter = fn;
}
export function getAuthToken(): string | null {
  try {
    return (authTokenGetter?.() ?? null) as string | null;
  } catch {
    return null;
  }
}

// NEW: pozwól klientowi zaktualizować token (np. po refreshu)
export function setAuthTokenSetter(fn: (token: string | null, tokenType?: string) => void) {
  authTokenSetter = fn;
}
export function updateAuthToken(token: string | null, tokenType?: string) {
  try {
    authTokenSetter?.(token, tokenType);
  } catch {
    /* ignore */
  }
}

export function setOnUnauthorized(fn: () => void | Promise<void>) {
  unauthorizedHandler = fn;
}
export async function onUnauthorized() {
  if (!unauthorizedHandler) return;
  await unauthorizedHandler();
}
