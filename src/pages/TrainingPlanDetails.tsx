import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Target, 
  Activity,
  CheckCircle,
  Circle,
  Edit
} from "lucide-react";

const mockPlanDetails = {
  id: "1",
  athlete: "Anna Kowalska",
  sport: "Pływanie",
  plan: "Plan Zaawansowany",
  description: "Intensywny plan treningowy przygotowujący do zawodów na poziomie krajowym",
  startDate: "01.09.2024",
  endDate: "30.11.2024",
  totalSessions: 12,
  completedSessions: 3,
  weeks: [
    {
      week: 1,
      sessions: [
        {
          id: 1,
          day: "Poniedziałek",
          time: "17:00",
          type: "Technika",
          duration: 90,
          completed: true,
          exercises: [
            "Rozgrzewka - 400m wolny styl",
            "Technika kraul - 8x50m",
            "Interwały - 4x100m",
            "Wyciszenie - 200m"
          ]
        },
        {
          id: 2,
          day: "Środa",
          time: "18:00",
          type: "Wytrzymałość",
          duration: 120,
          completed: true,
          exercises: [
            "Rozgrzewka - 600m mieszanką",
            "Główna seria - 20x100m",
            "Technika grzbiet - 6x50m",
            "Wyciszenie - 300m"
          ]
        },
        {
          id: 3,
          day: "Piątek",
          time: "17:30",
          type: "Sprint",
          duration: 75,
          completed: false,
          exercises: [
            "Rozgrzewka - 500m wolny",
            "Starty - 8x25m",
            "Sprinty - 6x50m max",
            "Wyciszenie - 200m"
          ]
        }
      ]
    }
  ]
};

export default function TrainingPlanDetails() {
  const { id } = useParams();
  const plan = mockPlanDetails; // In real app, fetch by id

  const progressPercentage = (plan.completedSessions / plan.totalSessions) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/training">
          <Button variant="outline" size="sm" className="border-border hover:bg-sport-accent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{plan.plan}</h1>
          <p className="text-muted-foreground">{plan.athlete} • {plan.sport}</p>
        </div>
        <Button className="bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport">
          <Edit className="mr-2 h-4 w-4" />
          Edytuj Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Postęp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ukończone sesje</span>
                <span className="font-medium">{plan.completedSessions}/{plan.totalSessions}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Start</p>
                <p className="font-medium">{plan.startDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Koniec</p>
                <p className="font-medium">{plan.endDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Statystyki
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tygodni</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sesji/tydzień</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Średni czas</span>
              <span className="font-medium">95 min</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Następna sesja
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">Piątek, 15:30</p>
              <p className="text-sm text-muted-foreground">Sprint</p>
            </div>
            <Badge variant="secondary" className="bg-sport-accent">
              Za 2 dni
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Harmonogram treningów</CardTitle>
          <CardDescription>{plan.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {plan.weeks.map((week) => (
            <div key={week.week} className="space-y-4">
              <h3 className="font-semibold text-lg">Tydzień {week.week}</h3>
              <div className="grid gap-4">
                {week.sessions.map((session) => (
                  <Card key={session.id} className="border-border bg-sport-accent">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {session.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <h4 className="font-medium">{session.day}</h4>
                            <p className="text-sm text-muted-foreground">
                              {session.time} • {session.duration} min
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {session.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Ćwiczenia:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {session.exercises.map((exercise, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-xs">•</span>
                              {exercise}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}