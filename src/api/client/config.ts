export const API_URL = import.meta.env.VITE_API_URL ?? 'http://192.168.24.205:8080';
//export const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.sportactivity.webimpuls.pl';

export const API_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 15000);

// Statusy sensowne do automatycznego retry (tylko dla metod idempotentnych)
export const RETRY_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);
