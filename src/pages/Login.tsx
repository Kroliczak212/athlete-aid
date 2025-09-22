import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useLogin } from '@/api/queries/auth/useLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const login = useLogin();
  const nav = useNavigate();
  const loc = useLocation();
  const { toast } = useToast();

  const from = (loc.state as any)?.from?.pathname || '/';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ email, password });
      toast({ title: 'Zalogowano', description: email });
      nav(from, { replace: true });
    } catch (err: any) {
      toast({
        title: 'Błąd logowania',
        description: err?.message ?? 'Spróbuj ponownie',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left / hero */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-sport-accent/10 p-12">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">SportActivityApp</h1>
          <p className="text-muted-foreground">
            Zarządzaj sportowcami, planami treningowymi i analizą danych — szybciej i wygodniej.
          </p>
          <Separator />
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Panel trenera i zawodnika</li>
            <li>Plany i analityka obciążeń</li>
            <li>Integracje i raporty tygodniowe</li>
          </ul>
        </div>
      </div>

      {/* Right / form */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Zaloguj się</CardTitle>
            <CardDescription>Użyj swoich danych, aby uzyskać dostęp do panelu.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="anna.kowalska@klub.pl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Hasło</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={show ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center"
                    aria-label={show ? 'Ukryj hasło' : 'Pokaż hasło'}
                  >
                    {show ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={login.isPending}>
                {login.isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Logowanie…
                  </span>
                ) : (
                  'Zaloguj'
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Nie masz konta?{' '}
              <Link className="underline underline-offset-2" to="/register">
                Zarejestruj się
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
