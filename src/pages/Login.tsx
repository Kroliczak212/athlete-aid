import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useLogin } from '@/api/queries/auth/useLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Users, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  // PREFILL: demo@demo.pl / DemoPwd
  const [email, setEmail] = useState('demo@demo.pl');
  const [password, setPassword] = useState('DemoPwd');

  const login = useLogin();
  const nav = useNavigate();
  const loc = useLocation();
  const { toast } = useToast();
  const from = (loc.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ email, password });
      toast({ title: 'Zalogowano', description: email });
      nav(from, { replace: true });
    } catch (err: unknown) {
      const message =
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as any).message === 'string'
          ? (err as any).message
          : 'Spróbuj ponownie';
      toast({ title: 'Błąd logowania', description: message, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border bg-card shadow-card">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Logowanie</CardTitle>
          <CardDescription className="text-center">
            Zaloguj się do systemu zarządzania sportowcami
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="wprowadź email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Hasło</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="wprowadź hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Logowanie…
                </span>
              ) : (
                'Zaloguj się'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Nie masz konta? </span>
            <Link to="/register" className="text-primary hover:underline font-medium">
              Zarejestruj się
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
