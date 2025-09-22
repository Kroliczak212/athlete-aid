import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/api/endpoints/auth';
import { useAuth } from '@/auth/useAuth';
import type { Me } from '@/api/schemas/auth';

export function useMe() {
  const { accessToken, setUser } = useAuth();

  return useQuery<Me>({
    queryKey: ['me'],
    queryFn: async () => {
      const me = await getMe(accessToken ?? undefined);
      setUser(me);
      return me;
    },
    enabled: Boolean(accessToken),
    staleTime: 60_000,
  });
}
