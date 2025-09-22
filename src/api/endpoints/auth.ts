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
  return apiClient.post<RegisterResponse>(
    `${base}/register`,
    { body, timeoutMs: 15000 },
    RegisterResponseSchema,
  );
}

export async function postLogin(body: LoginRequest): Promise<LoginResponse> {
  return apiClient.post<LoginResponse>(
    `${base}/login`,
    { body, timeoutMs: 15000 },
    LoginResponseSchema,
  );
}

export async function postChangePassword(
  body: ChangePasswordRequest,
  authToken?: string | null,
): Promise<ChangePasswordResponse> {
  return apiClient.post<ChangePasswordResponse>(
    `${base}/change-password`,
    { body, timeoutMs: 15000, authToken: authToken ?? undefined },
    ChangePasswordResponseSchema,
  );
}

export async function getMe(authToken?: string | null): Promise<Me> {
  return apiClient.get<Me>(
    `${base}/me`,
    { timeoutMs: 15000, authToken: authToken ?? undefined },
    MeResponseSchema,
  );
}
export async function postLogout(authToken?: string | null): Promise<{ ok: boolean } | unknown> {
  return apiClient.post(`${base}/logout`, { timeoutMs: 10000, authToken: authToken ?? undefined });
}
