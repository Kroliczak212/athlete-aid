// src/api/endpoints/auth.ts
import { apiClient } from '@/api/client/http';
import {
  RegisterRequest,
  RegisterResponse,
  RegisterResponseSchema,
  LoginRequest,
  LoginResponse,
  LoginResponseSchema,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangePasswordResponseSchema,
  Me,
  MeResponseSchema,
} from '@/api/schemas/auth';

const base = '/api/v1/auth';

export async function postRegister(body: RegisterRequest): Promise<RegisterResponse> {
  return apiClient.request(
    `${base}/register`,
    { method: 'POST', body, timeoutMs: 15000, withCredentials: true },
    RegisterResponseSchema,
  );
}

export async function postLogin(body: LoginRequest): Promise<LoginResponse> {
  // withCredentials: true -> przyjmie Set-Cookie: rt=... (HttpOnly)
  return apiClient.request(
    `${base}/login`,
    { method: 'POST', body, timeoutMs: 15000, withCredentials: true },
    LoginResponseSchema,
  );
}

export async function postChangePassword(
  body: ChangePasswordRequest,
  authToken?: string | null,
): Promise<ChangePasswordResponse> {
  return apiClient.request(
    `${base}/change-password`,
    {
      method: 'POST',
      body,
      timeoutMs: 15000,
      authToken: authToken ?? undefined,
    },
    ChangePasswordResponseSchema,
  );
}

export async function getMe(): Promise<Me> {
  return apiClient.get(`${base}/me`, { timeoutMs: 10000 }, MeResponseSchema);
}

// NEW: odświeżenie access tokenu z HttpOnly cookie
export async function postRefresh(): Promise<LoginResponse> {
  return apiClient.request(
    `${base}/refresh`,
    { method: 'POST', withCredentials: true, timeoutMs: 10000 },
    LoginResponseSchema,
  );
}

// (opcjonalnie) informacja dla BE, a FE i tak czyści stan
export async function postLogout(): Promise<{ ok: boolean } | unknown> {
  return apiClient.request(`${base}/logout`, {
    method: 'POST',
    withCredentials: true,
    timeoutMs: 8000,
  });
}
