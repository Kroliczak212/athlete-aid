// src/api/queries/auth/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import { postRegister } from '@/api/endpoints/auth';
import type { RegisterRequest } from '@/api/schemas/auth';
import { useAuth } from '@/auth/useAuth';

export function useRegister() {
  const { setTokens } = useAuth();
  return useMutation({
    mutationFn: (body: RegisterRequest) => postRegister(body),
    onSuccess: (data) => {
      if (data.access_token) {
        setTokens({
          accessToken: data.access_token,
          tokenType: 'Bearer', // ← zamiast data.token_type
          persist: false,
        });
      }
    },
  });
}
