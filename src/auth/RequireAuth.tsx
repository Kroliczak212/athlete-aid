import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function RequireAuth() {
  const { isAuthenticated, isReady } = useAuth();
  const loc = useLocation();

  // Poczekaj na hydratację — zapobiega „odbiciu” na /login przy odświeżeniu/bezpośrednim wejściu
  if (!isReady) {
    return <div className="p-6 text-sm text-muted-foreground">Ładowanie…</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }
  return <Outlet />;
}
