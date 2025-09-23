import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Me } from "@/api/schemas/auth";
import {
  setAuthTokenGetter,
  setOnUnauthorized,
  setAuthTokenSetter,
} from "@/api/client/interceptors";

const LS_ACCESS = "access_token";
const LS_TYPE = "token_type";

type AuthState = {
  accessToken: string | null;
  tokenType: string;
  user: Me | null;
};

type AuthContextValue = {
  accessToken: string | null;
  tokenType: string;
  isAuthenticated: boolean;
  isReady: boolean;
  user: Me | null;
  setTokens: (p: {
    accessToken: string;
    tokenType?: string;
    persist?: boolean;
  }) => void;
  setUser: (u: Me | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  accessToken: null,
  tokenType: "Bearer",
  isAuthenticated: false,
  isReady: false,
  user: null,
  setTokens: () => {},
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthState>({
    accessToken: null,
    tokenType: "Bearer",
    user: null,
  });
  const [isReady, setIsReady] = useState(false);

  const setTokens = useCallback(
    ({
      accessToken,
      tokenType = "Bearer",
      persist = true,
    }: {
      accessToken: string;
      tokenType?: string;
      persist?: boolean;
    }) => {
      setAuth((s) => ({ ...s, accessToken, tokenType, user: null }));
      try {
        if (persist) {
          localStorage.setItem(LS_ACCESS, accessToken);
          localStorage.setItem(LS_TYPE, tokenType);
        } else {
          localStorage.removeItem(LS_ACCESS);
          localStorage.removeItem(LS_TYPE);
        }
      } catch {
        /* ignore */
      }
    },
    []
  );

  const setUser = useCallback(
    (u: Me | null) => setAuth((s) => ({ ...s, user: u })),
    []
  );

  const logout = useCallback(() => {
    setAuth({ accessToken: null, tokenType: "Bearer", user: null });
    try {
      localStorage.removeItem(LS_ACCESS);
      localStorage.removeItem(LS_TYPE);
    } catch {
      /* ignore */
    }
  }, []);

  // Integracja z klientem HTTP (token getter/setter, reakcja na 401)
  useEffect(() => {
    setAuthTokenGetter(() => auth.accessToken);
    setAuthTokenSetter((token, tokenType) => {
      if (token) {
        setTokens({
          accessToken: token,
          tokenType: tokenType ?? "Bearer",
          persist: true,
        });
      } else {
        logout();
      }
    });
    setOnUnauthorized(logout);
  }, [auth.accessToken, logout, setTokens]);

  // Sync między kartami (dot. localStorage)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_ACCESS || e.key === LS_TYPE) {
        const tok = localStorage.getItem(LS_ACCESS);
        const typ = localStorage.getItem(LS_TYPE) || "Bearer";
        setAuth((s) => ({
          ...s,
          accessToken: tok,
          tokenType: typ,
          user: null,
        }));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Hydratacja po F5: bierzemy tylko z localStorage (brak refresh).
  useEffect(() => {
    const tok = localStorage.getItem(LS_ACCESS);
    const typ = localStorage.getItem(LS_TYPE) || "Bearer";
    if (tok) {
      setAuth((s) => ({ ...s, accessToken: tok, tokenType: typ }));
    }
    setIsReady(true);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken: auth.accessToken,
      tokenType: auth.tokenType,
      isAuthenticated: Boolean(auth.accessToken),
      isReady,
      user: auth.user,
      setTokens,
      setUser,
      logout,
    }),
    [auth, isReady, setTokens, setUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
