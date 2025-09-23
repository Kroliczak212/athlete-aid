import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogin, getMeWithToken } from "@/api/endpoints/auth";
import type { LoginRequest } from "@/api/schemas/auth";
import { useAuth } from "@/auth/useAuth";

export function useLogin() {
  const { setTokens, setUser } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: async (data) => {
      const token = data.access_token;
      const type = data.token_type ?? "Bearer";

      // 1) zapisz token (persist w LS)
      setTokens({ accessToken: token, tokenType: type, persist: true });

      // 2) pobierz profil „na świeżo” tym tokenem, żeby nie było wyścigów
      try {
        const me = await getMeWithToken(token);
        setUser(me);
        qc.setQueryData(["me"], me);
      } catch {
        /* opcjonalnie: toast/telemetria */
      }
    },
  });
}
