import { apiClient } from "@/api/client/http";
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
} from "@/api/schemas/auth";

const base = "/api/v1/auth";

export async function postRegister(
  body: RegisterRequest
): Promise<RegisterResponse> {
  return apiClient.request(
    `${base}/register`,
    { method: "POST", body, timeoutMs: 15000, authRequired: false },
    RegisterResponseSchema
  );
}

export async function postLogin(body: LoginRequest): Promise<LoginResponse> {
  return apiClient.request(
    `${base}/login`,
    { method: "POST", body, timeoutMs: 15000, authRequired: false },
    LoginResponseSchema
  );
}

export async function postChangePassword(
  body: ChangePasswordRequest,
  authToken?: string | null
): Promise<ChangePasswordResponse> {
  return apiClient.request(
    `${base}/change-password`,
    {
      method: "POST",
      body,
      timeoutMs: 15000,
      authToken: authToken ?? undefined, // wymaga Bearera
      authRequired: true,
    },
    ChangePasswordResponseSchema
  );
}

export async function getMe(): Promise<Me> {
  return apiClient.get(
    `${base}/me`,
    { timeoutMs: 10000, authRequired: true },
    MeResponseSchema
  );
}

/** Pobranie profilu „na świeżo” używając tokenu z odpowiedzi login/register */
export async function getMeWithToken(token: string): Promise<Me> {
  return apiClient.get(
    `${base}/me`,
    { timeoutMs: 10000, authToken: token, authRequired: true },
    MeResponseSchema
  );
}

export async function postLogout(): Promise<{ ok: boolean } | unknown> {
  // Możesz ustawić `authRequired: false` jeśli backend nie wymaga Bearera.
  return apiClient.request(`${base}/logout`, {
    method: "POST",
    timeoutMs: 8000,
    authRequired: false,
  });
}
