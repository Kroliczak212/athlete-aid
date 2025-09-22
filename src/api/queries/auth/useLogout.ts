// src/api/queries/auth/useLogout.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLogout } from '@/api/endpoints/auth';
import { useAuth } from '@/auth/useAuth';

export function useLogout() {
  const { logout } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await postLogout(); // ← bez argumentu
      } finally {
        logout();
        qc.removeQueries({ queryKey: ['me'] });
      }
    },
  });
}
