import { apiClient } from '../client/http';
import {
  LoginRequest,
  LoginRequestSchema,
  LoginResponse,
  LoginResponseSchema,
  RefreshResponse,
  RefreshResponseSchema,
  User,
  UserSchema,
} from '../schemas/auth.schema';

export const AuthAPI = {
  login: (payload: LoginRequest) =>
    apiClient.post<LoginResponse>(
      '/auth/login',
      { body: LoginRequestSchema.parse(payload) },
      LoginResponseSchema,
    ),

  me: () => apiClient.get<User>('/auth/me', undefined, UserSchema),

  refresh: (refreshToken: string) =>
    apiClient.post<RefreshResponse>(
      '/auth/refresh',
      { body: { refreshToken } },
      RefreshResponseSchema,
    ),

  logout: () => apiClient.post<void>('/auth/logout'),
};
