import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Target, 
  Activity,
  CheckCircle,
  Circle,
  Heart,
  Zap,
  TrendingUp,
  Medal,
  Camera,
  MessageSquare
} from "lucide-react";

const mockAthleteData = {
  name: "Anna Kowalska",
  sport: "Pływanie",
  level: "Zaawansowany",
  nextSession: "15.09.2024 18:00",
  weekProgress: 3,
  weekTotal: 4,
  currentPlan: {
    name: "Plan Przygotowawczy - Wrześień",
    progress: 65,
    sessionsCompleted: 8,
    totalSessions: 12
  },
  todaySession: {
    type: "Technika",
    time: "18:00",
    duration: 90,
    exercises: [
      "Rozgrzewka - 400m wolny styl",
      "Technika kraul - 8x50m",
      "Interwały - 4x100m",
      "Wyciszenie - 200m"
    ]
  },
  recentResults: [
    { date: "12.09", exercise: "100m kraul", result: "1:02.45", improvement: "+2.1s" },
    { date: "10.09", exercise: "200m mieszanka", result: "2:28.12", improvement: "+1.8s" },
    { date: "08.09", exercise: "50m motyl", result: "28.67", improvement: "+0.5s" }
  ],
  weeklyStats: {
    totalTime: 360,
    avgHeartRate: 145,
    caloriesBurned: 1240,
    sessionsCompleted: 3
  }
};

export default function AthleteDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header - Mobile responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Witaj, {mockAthleteData.name}!
          </h1>
          <p className="text-muted-foreground">
            {mockAthleteData.sport} • Poziom {mockAthleteData.level}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-primary hover:bg-sport-hover text-primary-foreground">
            <Camera className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Wyślij dane</span>
            <span className="sm:hidden">Dane</span>
          </Button>
          <Button variant="outline" className="border-border hover:bg-sport-accent">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Kontakt z trenerem</span>
            <span className="sm:hidden">Trener</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards - Mobile responsive grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Ten tydzień</p>
                <p className="text-lg font-bold">{mockAthleteData.weekProgress}/{mockAthleteData.weekTotal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Łączny czas</p>
                <p className="text-lg font-bold">{mockAthleteData.weeklyStats.totalTime}min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Śr. tętno</p>
                <p className="text-lg font-bold">{mockAthleteData.weeklyStats.avgHeartRate} bpm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Kalorie</p>
                <p className="text-lg font-bold">{mockAthleteData.weeklyStats.caloriesBurned}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-sport-accent">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Przegląd
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Trening
          </TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Wyniki
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Current Plan Progress */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Aktualny Plan
                </CardTitle>
                <CardDescription>{mockAthleteData.currentPlan.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Postęp</span>
                    <span className="font-medium">
                      {mockAthleteData.currentPlan.sessionsCompleted}/{mockAthleteData.currentPlan.totalSessions}
                    </span>
                  </div>
                  <Progress value={mockAthleteData.currentPlan.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    {mockAthleteData.currentPlan.progress}% ukończone
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Next Training Session */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Następny Trening
                </CardTitle>
                <CardDescription>Dzisiaj, {mockAthleteData.todaySession.time}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-sport-accent">
                      {mockAthleteData.todaySession.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {mockAthleteData.todaySession.duration} min
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Plan treningowy:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {mockAthleteData.todaySession.exercises.slice(0, 2).map((exercise, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Circle className="h-3 w-3 text-primary" />
                          {exercise}
                        </li>
                      ))}
                      <li className="text-xs text-muted-foreground">...i więcej</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Dzisiejszy Trening</CardTitle>
              <CardDescription>
                {mockAthleteData.todaySession.type} • {mockAthleteData.todaySession.duration} minut
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAthleteData.todaySession.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-sport-accent rounded-lg">
                    <Circle className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">{exercise}</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      Ukończono
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-primary" />
                Ostatnie Wyniki
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAthleteData.recentResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-sport-accent rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{result.exercise}</p>
                      <p className="text-sm text-muted-foreground">{result.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{result.result}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-sport-success" />
                        <span className="text-xs text-sport-success">{result.improvement}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}