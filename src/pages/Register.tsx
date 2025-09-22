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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus } from 'lucide-react';

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
    } catch (err: any) {
      toast({
        title: 'Błąd rejestracji',
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
          <h1 className="text-3xl font-semibold tracking-tight">Dołącz do Athlete Aid</h1>
          <p className="text-muted-foreground">
            Stwórz konto i zacznij prowadzić zawodników: plany, komunikacja i analityka w jednym
            miejscu.
          </p>
          <Separator />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserPlus className="h-4 w-4" />
            Rejestracja trwa mniej niż minutę
          </div>
        </div>
      </div>

      {/* Right / form */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Rejestracja</CardTitle>
            <CardDescription>Uzupełnij dane i wybierz typ konta.</CardDescription>
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
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="anna.kowalska@klub.pl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="min. 8 znaków"
                  required
                />
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

              <Button type="submit" className="w-full" disabled={reg.isPending}>
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
            <p className="text-sm text-muted-foreground">
              Masz już konto?{' '}
              <Link className="underline underline-offset-2" to="/login">
                Zaloguj się
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
