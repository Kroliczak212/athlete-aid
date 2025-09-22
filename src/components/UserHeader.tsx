import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User, Bell } from 'lucide-react';

interface UserHeaderProps {
  className?: string;
}

export function UserHeader({ className }: UserHeaderProps) {
  const [notifications] = useState(3); // Mock notification count

  // Mock user data - in real app this would come from auth context
  const currentUser = {
    name: 'Jan Kowalski',
    email: 'jan.kowalski@sportklub.pl',
    role: 'Trener',
    avatar: '/placeholder.svg',
  };

  const handleLogout = () => {
    // In real app, this would handle actual logout
    console.log('Logging out...');
  };

  return (
    <div className={`flex items-center justify-end space-x-4 ${className}`}>
      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
            {notifications}
          </span>
        )}
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 w-auto px-2 py-1">
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">{currentUser.name}</div>
                <div className="text-xs text-muted-foreground">{currentUser.email}</div>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>
                  {currentUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{currentUser.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
              <p className="text-xs leading-none text-primary">{currentUser.role}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Ustawienia</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Wyloguj</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
