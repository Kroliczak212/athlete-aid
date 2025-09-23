import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRegister, getMeWithToken } from "@/api/endpoints/auth";
import type { RegisterRequest } from "@/api/schemas/auth";
import { useAuth } from "@/auth/useAuth";

export function useRegister() {
  const { setTokens, setUser } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: RegisterRequest) => postRegister(body),
    onSuccess: async (data) => {
      if (data.access_token) {
        const token = data.access_token;
        const type = (data as any).token_type ?? "Bearer";
        setTokens({ accessToken: token, tokenType: type, persist: true });

        try {
          const me = await getMeWithToken(token);
          setUser(me);
          qc.setQueryData(["me"], me);
        } catch {
          /* ignore */
        }
      }
    },
  });
}
