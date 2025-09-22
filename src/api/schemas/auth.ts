import { z } from 'zod';

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  accountType: z.string().min(1), // na start dowolny string, jeśli wolisz, zrób z.enum(["athlete"])
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  access_token: z.string().optional(),
  refresh_token: z.string().optional(),
});
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  token_type: z.string(), // zwykle "Bearer"
  expires_in: z.number(),
  access_token: z.string(),
  refresh_token: z.string(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const ChangePasswordRequestSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(8),
});
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;

// serwer może nic nie zwrócić -> akceptujemy dowolny JSON lub brak
export const ChangePasswordResponseSchema = z.unknown();
export type ChangePasswordResponse = unknown;

export const MeResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  accountType: z.string(), // jeśli chcesz enum: z.enum(["athlete","coach","club"])
  createdAt: z.string(),
  lastPasswordChange: z.string().nullable().optional(),
});
export type Me = z.infer<typeof MeResponseSchema>;
