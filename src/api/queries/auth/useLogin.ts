import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/api/endpoints/auth';
import type { LoginRequest } from '@/api/schemas/auth';
import { useAuth } from '@/auth/useAuth';

export function useLogin() {
  const { setTokens } = useAuth();
  return useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: (data) => {
      // refreshToken pomijamy — FE trzyma tylko access w pamięci/LS
      setTokens({
        accessToken: data.access_token,
        tokenType: data.token_type,
        // persist: true // (opcjonalnie) możesz sterować „Zapamiętaj mnie”
      });
    },
  });
}
