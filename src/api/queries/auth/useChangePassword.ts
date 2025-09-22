import { useMutation } from '@tanstack/react-query';
import { postChangePassword } from '@/api/endpoints/auth';
import type { ChangePasswordRequest } from '@/api/schemas/auth';
import { useAuth } from '@/auth/useAuth';

export function useChangePassword() {
  const { accessToken } = useAuth();
  return useMutation({
    mutationFn: async (body: ChangePasswordRequest) => {
      return postChangePassword(body, accessToken ?? undefined);
    },
  });
}
