import { useQuery } from '@tanstack/react-query';
import { AuthAPI } from '../../endpoints/auth.api';

export function useProfile(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => AuthAPI.me(),
    enabled: opts?.enabled ?? true,
    staleTime: 30_000,
  });
}
