import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { Me } from '@/api/schemas/auth';
import { setAuthTokenGetter, setOnUnauthorized } from '@/api/client/interceptors';

type AuthState = {
  accessToken: string | null;
  tokenType: string;
  user: Me | null;
};

type AuthContextValue = {
  accessToken: string | null;
  tokenType: string;
  isAuthenticated: boolean;
  /** Czy kontekst już się zhydratował z localStorage (ważne dla guardów) */
  isReady: boolean;
  user: Me | null;
  /** Ustaw access token; persist=false => tylko w tej karcie (bez localStorage) */
  setTokens: (p: { accessToken: string; tokenType?: string; persist?: boolean }) => void;
  /** Ustaw/wyczyść profil użytkownika */
  setUser: (u: Me | null) => void;
  /** Wyloguj i wyczyść stan */
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  accessToken: null,
  tokenType: 'Bearer',
  isAuthenticated: false,
  isReady: false,
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
  const [isReady, setIsReady] = useState(false);

  // 1) Hydratacja z localStorage na starcie
  useEffect(() => {
    const tok = localStorage.getItem('access_token');
    const typ = localStorage.getItem('token_type') || 'Bearer';
    if (tok) setAuth((s) => ({ ...s, accessToken: tok, tokenType: typ }));
    setIsReady(true);
  }, []);

  // 2) Sync między kartami
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'access_token' || e.key === 'token_type') {
        const tok = localStorage.getItem('access_token');
        const typ = localStorage.getItem('token_type') || 'Bearer';
        setAuth((s) => ({ ...s, accessToken: tok, tokenType: typ, user: null }));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // 3) Udostępnij token i reakcję na 401 klientowi HTTP
  useEffect(() => {
    setAuthTokenGetter(() => auth.accessToken);
  }, [auth.accessToken]);

  useEffect(() => {
    setOnUnauthorized(logout);
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
      isReady,
      user: auth.user,
      setTokens,
      setUser,
      logout,
    }),
    [auth, isReady, setTokens, setUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
