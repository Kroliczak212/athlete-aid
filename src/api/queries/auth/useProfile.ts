// src/api/queries/auth/useProfile.ts
import { useMe } from "./useMe";

/** Zachowujemy istniejące importy w kodzie, ale realnie korzystamy z nowego useMe */
export function useProfile(opts?: { enabled?: boolean }) {
  const q = useMe();
  // respektuj ewentualny parametr enabled (opcjonalnie)
  // jeśli gdzieś masz użyty opts.enabled, to zamiast tego pilnuj enabled w useMe na podstawie accessToken.
  return q;
}
