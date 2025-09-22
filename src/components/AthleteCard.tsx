import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { EditAthleteDialog } from '@/components/EditAthleteDialog';
import { TrainingConfigDialog } from '@/components/TrainingConfigDialog';
import { TrainerFeedbackDialog } from '@/components/TrainerFeedbackDialog';
import {
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Edit,
  Settings,
  MessageSquare,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AthleteCardProps {
  athlete: {
    id: string;
    name: string;
    sport: string;
    nextSession: string;
    paid: boolean;
    lastAttendance: boolean;
    initials: string;
  };
}

export function AthleteCard({ athlete }: AthleteCardProps) {
  return (
    <Card className="hover:shadow-card transition-all duration-200 bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 bg-sport-accent">
              <AvatarFallback className="font-semibold text-sport-primary">
                {athlete.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-card-foreground">{athlete.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {athlete.sport}
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <EditAthleteDialog athlete={athlete}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edytuj dane
                </DropdownMenuItem>
              </EditAthleteDialog>
              <DropdownMenuSeparator />
              <TrainingConfigDialog athleteName={athlete.name}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Settings className="mr-2 h-4 w-4" />
                  Konfiguruj trening
                </DropdownMenuItem>
              </TrainingConfigDialog>
              <TrainerFeedbackDialog athleteName={athlete.name}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Wystawy uwagi
                </DropdownMenuItem>
              </TrainerFeedbackDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Następne: {athlete.nextSession}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span
              className={`text-sm font-medium ${
                athlete.paid ? 'text-green-600' : 'text-destructive'
              }`}
            >
              {athlete.paid ? 'Opłacone' : 'Nieopłacone'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {athlete.lastAttendance ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
            <span className="text-xs text-muted-foreground">Ostatnia obecność</span>
          </div>
        </div>

        <Link to={`/athlete/${athlete.id}`}>
          <Button variant="outline" className="w-full mt-3 border-border hover:bg-sport-accent">
            Zobacz szczegóły
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
