import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Lock, User, Users, Building } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    clubName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-border bg-card shadow-card">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Rejestracja</CardTitle>
          <CardDescription className="text-center">
            Stwórz konto w systemie zarządzania sportowcami
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Imię</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="imię"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nazwisko</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="nazwisko"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="wprowadź email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rola</Label>
              <Select onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="wybierz rolę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trainer">Trener</SelectItem>
                  <SelectItem value="club_manager">Menedżer klubu</SelectItem>
                  <SelectItem value="athlete">Sportowiec</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.role === 'trainer' || formData.role === 'club_manager') && (
              <div className="space-y-2">
                <Label htmlFor="clubName">Nazwa klubu</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="clubName"
                    type="text"
                    placeholder="nazwa klubu"
                    value={formData.clubName}
                    onChange={(e) => handleInputChange('clubName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Hasło</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="wprowadź hasło"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="potwierdź hasło"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport"
            >
              Zarejestruj się
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Masz już konto? </span>
            <Link to="/login" className="text-primary hover:underline font-medium">
              Zaloguj się
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
