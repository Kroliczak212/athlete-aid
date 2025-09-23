import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/endpoints/auth";
import { useAuth } from "@/auth/useAuth";
import type { Me } from "@/api/schemas/auth";

export function useMe() {
  const { isReady, isAuthenticated, user, setUser } = useAuth();

  return useQuery<Me>({
    queryKey: ["me"],
    queryFn: async () => {
      const me = await getMe();
      setUser(me);
      return me;
    },
    enabled: isReady && isAuthenticated,
    initialData: user ?? undefined,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: (count, err: any) => {
      const status = err?.status ?? 0;
      if (status === 401 || status === 403) return false;
      return count < 1;
    },
  });
}
