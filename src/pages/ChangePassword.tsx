import { useState } from 'react';
import { useChangePassword } from '@/api/queries/auth/useChangePassword';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ChangePassword() {
  const [oldPassword, setOld] = useState('');
  const [newPassword, setNew] = useState('');
  const { toast } = useToast();
  const mutation = useChangePassword();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({ oldPassword, newPassword });
      toast({ title: 'Hasło zmienione' });
      setOld('');
      setNew('');
    } catch (err: any) {
      toast({
        title: 'Nie udało się zmienić hasła',
        description: err?.message ?? 'Sprawdź stare hasło',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="text-2xl font-semibold mb-6">Zmiana hasła</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="old">Stare hasło</Label>
          <Input
            id="old"
            type="password"
            value={oldPassword}
            onChange={(e) => setOld(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="new">Nowe hasło</Label>
          <Input
            id="new"
            type="password"
            value={newPassword}
            onChange={(e) => setNew(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Zmienianie...' : 'Zmień hasło'}
        </Button>
      </form>
    </div>
  );
}
