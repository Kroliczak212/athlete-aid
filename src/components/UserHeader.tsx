import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMe } from '@/api/queries/auth/useMe';
import { useLogout } from '@/api/queries/auth/useLogout';
import { useAuth } from '@/auth/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Settings } from 'lucide-react';

const typeLabel: Record<string, string> = {
  athlete: 'Zawodnik',
  coach: 'Trener',
  club: 'Klub',
};

export function UserHeader() {
  const { user } = useAuth();
  const { data: me } = useMe(); // pobiera i synchronizuje profil
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  const profile = me ?? user;

  const initials = useMemo(() => {
    const fn = profile?.firstName?.[0] ?? '';
    const ln = profile?.lastName?.[0] ?? '';
    return `${fn}${ln}`.toUpperCase() || 'U';
  }, [profile]);

  const roleLabel = profile?.accountType
    ? (typeLabel[profile.accountType] ?? profile.accountType)
    : undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="avatar" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium leading-none">
                  {profile ? `${profile.firstName} ${profile.lastName}` : 'Użytkownik'}
                </div>
                {roleLabel && (
                  <Badge variant="secondary" className="text-[10px] py-0 px-2">
                    {roleLabel}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{profile?.email ?? '—'}</div>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="space-y-1">
          <div className="font-medium">
            {profile ? `${profile.firstName} ${profile.lastName}` : 'Użytkownik'}
          </div>
          {profile?.email && <div className="text-xs text-muted-foreground">{profile.email}</div>}
          {roleLabel && (
            <Badge variant="outline" className="text-[10px]">
              {roleLabel}
            </Badge>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Link do profilu (placeholder) */}
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            navigate('/profile');
          }}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          Profil
        </DropdownMenuItem>

        {/* Link do ustawień konta (placeholder) */}
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            navigate('/settings');
          }}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          Ustawienia konta
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            logoutMutation.mutate();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Wyloguj
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
