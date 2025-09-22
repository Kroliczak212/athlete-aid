// src/auth/AuthProvider.tsx
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { Me } from '@/api/schemas/auth';
import {
  setAuthTokenGetter,
  setOnUnauthorized,
  setAuthTokenSetter,
} from '@/api/client/interceptors';
import { API_URL } from '@/api/client/config';

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
  setTokens: (p: { accessToken: string; tokenType?: string; persist?: boolean }) => void;
  setUser: (u: Me | null) => void;
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

  const setTokens = useCallback(
    ({
      accessToken,
      tokenType = 'Bearer',
      persist = false,
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

  // Rejestracja integracji z klientem HTTP
  useEffect(() => {
    setAuthTokenGetter(() => auth.accessToken);
    setAuthTokenSetter((token, tokenType) => {
      if (token) {
        setTokens({ accessToken: token, tokenType: tokenType ?? 'Bearer', persist: false });
      } else {
        logout();
      }
    });
    // KLUCZOWA ZMIANA ↓
    setOnUnauthorized(logout);
  }, [auth.accessToken, logout, setTokens]);

  // Sync między kartami
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

  // Hydratacja + BOOTSTRAP REFRESH (HttpOnly cookie)
  useEffect(() => {
    (async () => {
      const tok = localStorage.getItem('access_token');
      const typ = localStorage.getItem('token_type') || 'Bearer';
      if (tok) {
        setAuth((s) => ({ ...s, accessToken: tok, tokenType: typ }));
        setIsReady(true);
        return;
      }
      // brak access w LS -> spróbuj odświeżyć z cookie
      try {
        const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (res.ok) {
          const data: any = await res.json().catch(() => null);
          if (data?.access_token) {
            setTokens({
              accessToken: data.access_token,
              tokenType: data.token_type ?? 'Bearer',
              persist: false,
            });
          }
        }
      } catch {
        // ignore
      } finally {
        setIsReady(true);
      }
    })();
  }, [setTokens]);

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
