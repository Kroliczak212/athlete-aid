import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '@/api/queries/auth/useRegister';
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus, Mail, Lock } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    accountType: 'athlete',
  });
  const reg = useRegister();
  const nav = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await reg.mutateAsync(form);
      toast({ title: 'Konto utworzone', description: form.email });
      nav('/');
    } catch (err: unknown) {
      const message =
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as any).message === 'string'
          ? (err as any).message
          : 'Spróbuj ponownie';
      toast({
        title: 'Błąd rejestracji',
        description: message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border bg-card shadow-card">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Rejestracja</CardTitle>
          <CardDescription className="text-center">
            Uzupełnij dane i wybierz typ konta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">Imię</Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="Anna"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nazwisko</Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Kowalska"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="anna.kowalska@klub.pl"
                  className="pl-10"
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
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="min. 8 znaków"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Typ konta</Label>
              <Select
                value={form.accountType}
                onValueChange={(v) => setForm({ ...form, accountType: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="athlete">Zawodnik</SelectItem>
                  <SelectItem value="coach">Trener</SelectItem>
                  <SelectItem value="club">Klub</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport"
              disabled={reg.isPending}
            >
              {reg.isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Rejestrowanie…
                </span>
              ) : (
                'Utwórz konto'
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground text-center">
            Masz już konto?{' '}
            <Link className="underline underline-offset-2" to="/login">
              Zaloguj się
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
