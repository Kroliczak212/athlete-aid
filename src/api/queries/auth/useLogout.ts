import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../auth/useAuth";

export function useLogout() {
  const { logout } = useAuth();
  return useMutation({
    mutationFn: async () => {
      await logout();
    },
  });
}
