// Proste trzymanie tokenów w pamięci + localStorage.
type Session = { accessToken: string | null; refreshToken?: string | null };
const KEY = "auth.session";

let memory: Session = { accessToken: null, refreshToken: null };

export function loadSession(): Session {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) memory = JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { ...memory };
}

export function saveSession(s: Session) {
  memory = { ...s };
  try {
    localStorage.setItem(KEY, JSON.stringify(memory));
  } catch {
    /* ignore */
  }
}

export function clearSession() {
  memory = { accessToken: null, refreshToken: null };
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export const getAccessToken = () => memory.accessToken;
export const getRefreshToken = () => memory.refreshToken ?? null;
