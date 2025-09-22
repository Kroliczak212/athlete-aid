import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { Me } from '@/api/schemas/auth';

type AuthState = {
  accessToken: string | null;
  tokenType: string;
  user: Me | null;
};

type AuthContextValue = {
  accessToken: string | null;
  tokenType: string;
  isAuthenticated: boolean;
  user: Me | null;
  setTokens: (p: { accessToken: string; tokenType?: string; persist?: boolean }) => void;
  setUser: (u: Me | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  accessToken: null,
  tokenType: 'Bearer',
  isAuthenticated: false,
  user: null,
  setTokens: () => {},
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    accessToken: null,
    tokenType: 'Bearer',
    user: null,
  });

  // 1) Hydratacja po starcie (żeby nowe karty też miały stan)
  useEffect(() => {
    const tok = localStorage.getItem('access_token');
    const typ = localStorage.getItem('token_type') || 'Bearer';
    if (tok) setAuth((s) => ({ ...s, accessToken: tok, tokenType: typ }));
  }, []);

  // 2) Sync między kartami – reaguj na zmiany localStorage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'access_token') {
        const tok = localStorage.getItem('access_token');
        const typ = localStorage.getItem('token_type') || 'Bearer';
        // po zmianie tokenu czyścimy usera (odświeży się z /auth/me)
        setAuth((s) => ({ ...s, accessToken: tok, tokenType: typ, user: null }));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setTokens = useCallback(
    ({
      accessToken,
      tokenType = 'Bearer',
      persist = true,
    }: {
      accessToken: string;
      tokenType?: string;
      persist?: boolean;
    }) => {
      setAuth((s) => ({ ...s, accessToken, tokenType, user: null }));
      if (persist) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('token_type', tokenType);
      } else {
        // czyszczenie ewentualnych starych wartości
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
      }
    },
    [],
  );

  const setUser = useCallback((u: Me | null) => setAuth((s) => ({ ...s, user: u })), []);

  const logout = useCallback(() => {
    setAuth({ accessToken: null, tokenType: 'Bearer', user: null });
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_email');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken: auth.accessToken,
      tokenType: auth.tokenType,
      isAuthenticated: Boolean(auth.accessToken),
      user: auth.user,
      setTokens,
      setUser,
      logout,
    }),
    [auth, setTokens, setUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
