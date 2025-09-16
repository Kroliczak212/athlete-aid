import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react";

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
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Następne: {athlete.nextSession}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className={`text-sm font-medium ${
              athlete.paid ? "text-green-600" : "text-destructive"
            }`}>
              {athlete.paid ? "Opłacone" : "Nieopłacone"}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            {athlete.lastAttendance ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
            <span className="text-xs text-muted-foreground">
              Ostatnia obecność
            </span>
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