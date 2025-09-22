import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  setAuthTokenGetter,
  setOnUnauthorized,
} from "../api/client/interceptors";
import {
  loadSession,
  saveSession,
  clearSession,
  getAccessToken,
} from "./session";
import { useProfile } from "../api/queries/auth/useProfile";
import { queryClient } from "../api/queries/queryClient";
import { AuthAPI } from "../api/endpoints/auth.api";

import type { User } from "../api/schemas/auth.schema";

type Tokens = { accessToken: string; refreshToken?: string | null };

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  tokens: Tokens | null;
  setTokens: (t: Tokens) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initial = loadSession();
  const [tokens, setTokensState] = useState<Tokens | null>(
    initial.accessToken
      ? {
          accessToken: initial.accessToken,
          refreshToken: initial.refreshToken ?? null,
        }
      : null
  );

  // rejestrujemy interceptory klienta HTTP
  useEffect(() => {
    setAuthTokenGetter(() => getAccessToken());
    setOnUnauthorized(async () => {
      await logout(); // 401 -> czyścimy sesję
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // dane użytkownika – tylko gdy mamy token
  const { data: user, isLoading: isLoadingUser } = useProfile({
    enabled: !!tokens?.accessToken,
  });

  const setTokens = (t: Tokens) => {
    setTokensState(t);
    saveSession({
      accessToken: t.accessToken,
      refreshToken: t.refreshToken ?? null,
    });
  };

  const logout = async () => {
    try {
      await AuthAPI.logout();
    } catch {
      /* ignore */
    }
    clearSession();
    setTokensState(null);
    queryClient.clear();
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user: user ?? null,
      isAuthenticated: !!tokens?.accessToken,
      isLoadingUser,
      tokens,
      setTokens,
      logout,
    }),
    [user, isLoadingUser, tokens]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuthContext must be used within <AuthProvider>");
  return ctx;
}
