import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthAPI } from '../../endpoints/auth.api';
import { useAuth } from '../../../auth/useAuth';
import type { LoginRequest, LoginResponse } from '../../schemas/auth.schema';

export function useLogin() {
  const { setTokens } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginRequest) => AuthAPI.login(payload),
    onSuccess: (res: LoginResponse) => {
      setTokens({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken ?? null,
      });
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
}
