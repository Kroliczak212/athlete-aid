import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageToTrainerDialog } from "@/components/MessageToTrainerDialog";
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
  MessageSquare,
  Upload,
  BarChart3,
  Settings,
  Bell
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
      {
        name: "Rozgrzewka",
        description: "Powolne rozpływanie z koncentracją na technice oddychania. Stopniowe zwiększanie tempa, aby przygotować mięśnie do głównej części treningu.",
        details: "400m wolny styl w tempie 70% maksymalnego",
        duration: 15
      },
      {
        name: "Technika kraul",
        description: "Praca nad poprawą techniki wioślowania. Koncentracja na wysokim łokciu i efektywnym wyciągnięciu ręki.",
        details: "8x50m z 30s odpoczynku między powtórzeniami",
        duration: 25
      },
      {
        name: "Interwały",
        description: "Wysokointensywna praca w strefie progowej. Utrzymanie stałego tempa i kontrola tętna.",
        details: "4x100m z 90s odpoczynku, tempo 85% maksymalnego",
        duration: 35
      },
      {
        name: "Wyciszenie",
        description: "Powolne pływanie relaksacyjne. Koncentracja na głębokim oddychaniu i rozluźnieniu mięśni.",
        details: "200m wolny styl w tempie regeneracyjnym",
        duration: 15
      }
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
            <Upload className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Wyślij dane</span>
            <span className="sm:hidden">Dane</span>
          </Button>
          <MessageToTrainerDialog>
            <Button variant="outline" className="border-border hover:bg-sport-accent">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Kontakt z trenerem</span>
              <span className="sm:hidden">Trener</span>
            </Button>
          </MessageToTrainerDialog>
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
        <TabsList className="grid w-full grid-cols-4 bg-sport-accent">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Przegląd
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Trening
          </TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Wyniki
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Dashboard
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
                          <div>
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-xs">{exercise.details}</div>
                          </div>
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
                  <div key={index} className="p-4 bg-sport-accent rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{exercise.name}</div>
                        <div className="text-sm text-muted-foreground mb-2">{exercise.description}</div>
                        <div className="text-xs font-medium text-primary">{exercise.details}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{exercise.duration} min</Badge>
                        <Button size="sm" variant="outline" className="text-xs">
                          Ukończono
                        </Button>
                      </div>
                    </div>
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

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Quick Actions */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Szybkie akcje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <MessageToTrainerDialog>
                  <Button className="w-full justify-start bg-primary hover:bg-sport-hover text-primary-foreground">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Wyślij wiadomość do trenera
                  </Button>
                </MessageToTrainerDialog>
                <Button variant="outline" className="w-full justify-start border-border hover:bg-sport-accent">
                  <Upload className="mr-2 h-4 w-4" />
                  Prześlij dane z urządzenia
                </Button>
                <Button variant="outline" className="w-full justify-start border-border hover:bg-sport-accent">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Zobacz szczegółowe statystyki
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Powiadomienia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border-l-4 border-l-green-500 rounded">
                  <p className="text-sm font-medium text-green-800 dark:text-green-400">
                    Nowy plan treningowy dostępny
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                    Trener dodał plan na kolejny tydzień
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-l-blue-500 rounded">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
                    Feedback od trenera
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                    Otrzymałeś uwagi do ostatniego treningu
                  </p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-l-orange-500 rounded">
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-400">
                    Przypomnienie o treningu
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">
                    Trening jutro o 18:00
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training History */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Historia treningów - ostatni tydzień</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "16.09", type: "Technika", duration: "90 min", completed: true, rating: 4, id: 1 },
                  { date: "14.09", type: "Wytrzymałość", duration: "120 min", completed: true, rating: 5, id: 2 },
                  { date: "12.09", type: "Interwały", duration: "60 min", completed: true, rating: 3, id: 3 },
                  { date: "10.09", type: "Siła", duration: "75 min", completed: false, rating: 0, id: 4 },
                ].map((training, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-sport-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-colors"
                    onClick={() => training.completed && (window.location.href = `/training/${training.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        training.completed ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium">{training.type}</p>
                        <p className="text-sm text-muted-foreground">{training.date} • {training.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {training.completed ? (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-3 h-3 rounded-full ${
                                i < training.rating ? 'bg-yellow-400' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          Pominięty
                        </Badge>
                      )}
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