import { z } from 'zod';
import { IdSchema, TimestampSchema } from './common.schema';

export const UserSchema = z.object({
  id: IdSchema,
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  roles: z.array(z.string()).optional(),
  createdAt: TimestampSchema.optional(),
  updatedAt: TimestampSchema.optional(),
});
export type User = z.infer<typeof UserSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().optional(),
  user: UserSchema,
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RefreshResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().optional(),
});
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
