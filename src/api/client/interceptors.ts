// Prosty mechanizm wstrzyknięcia tokenu oraz reakcji na 401.
let authTokenGetter: (() => string | null | undefined) | null = null;
let unauthorizedHandler: (() => void | Promise<void>) | null = null;

export function setAuthTokenGetter(fn: () => string | null | undefined) {
  authTokenGetter = fn;
}

export function getAuthToken(): string | null | undefined {
  return authTokenGetter?.() ?? null;
}

export function setOnUnauthorized(fn: () => void | Promise<void>) {
  unauthorizedHandler = fn;
}

export async function onUnauthorized() {
  if (unauthorizedHandler) await unauthorizedHandler();
}
