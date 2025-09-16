import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Users, 
  Plus, 
  Waves, 
  Footprints, 
  Bike,
  Dumbbell,
  Target
} from "lucide-react";

const mockTrainingPlans = [
  {
    id: "1",
    athlete: "Anna Kowalska",
    sport: "Pływanie",
    plan: "Plan Zaawansowany",
    nextSession: "15.09.2024 18:00",
    sessionsThisWeek: 3,
    totalSessions: 12,
    icon: Waves
  },
  {
    id: "2",
    athlete: "Tomasz Nowak", 
    sport: "Triathlon",
    plan: "Przygotowanie do zawodów",
    nextSession: "16.09.2024 17:00",
    sessionsThisWeek: 5,
    totalSessions: 18,
    icon: Footprints
  },
  {
    id: "3",
    athlete: "Maria Wiśniewska",
    sport: "Bieganie",
    plan: "Plan dla początkujących",
    nextSession: "17.09.2024 19:00", 
    sessionsThisWeek: 2,
    totalSessions: 8,
    icon: Footprints
  }
];

const mockWeeklySchedule = [
  {
    day: "Poniedziałek",
    sessions: [
      { time: "17:00", athlete: "Anna K.", sport: "Pływanie", type: "Technika" },
      { time: "18:30", athlete: "Tomasz N.", sport: "Triathlon", type: "Bieganie" }
    ]
  },
  {
    day: "Wtorek", 
    sessions: [
      { time: "16:00", athlete: "Maria W.", sport: "Bieganie", type: "Wytrzymałość" },
      { time: "19:00", athlete: "Piotr Z.", sport: "Kolarstwo", type: "Interwały" }
    ]
  },
  {
    day: "Środa",
    sessions: [
      { time: "18:00", athlete: "Anna K.", sport: "Pływanie", type: "Wytrzymałość" }
    ]
  }
];

export default function TrainingPlans() {
  const [selectedTab, setSelectedTab] = useState("plans");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plany Treningowe</h1>
          <p className="text-muted-foreground">
            Twórz i zarządzaj planami treningowymi dla sportowców
          </p>
        </div>
        <Button className="bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport">
          <Plus className="mr-2 h-4 w-4" />
          Nowy Plan
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-sport-accent">
          <TabsTrigger value="plans" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Plany Treningowe
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Harmonogram
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Szablony
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockTrainingPlans.map((plan) => (
              <Card key={plan.id} className="border-border bg-card hover:shadow-card transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <plan.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="bg-sport-accent">
                      {plan.sport}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{plan.athlete}</CardTitle>
                  <CardDescription>{plan.plan}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Następne: {plan.nextSession}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ten tydzień:</span>
                    <span className="font-medium">{plan.sessionsThisWeek}/{plan.totalSessions}</span>
                  </div>
                  <div className="w-full bg-sport-accent rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${(plan.sessionsThisWeek / plan.totalSessions) * 100}%` 
                      }}
                    />
                  </div>
                  <Button variant="outline" className="w-full mt-3 border-border hover:bg-sport-accent">
                    Edytuj Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid gap-4">
            {mockWeeklySchedule.map((day) => (
              <Card key={day.day} className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {day.day}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {day.sessions.length > 0 ? (
                    <div className="space-y-2">
                      {day.sessions.map((session, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 bg-sport-accent rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">{session.time}</span>
                            <span className="text-muted-foreground">|</span>
                            <span>{session.athlete}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {session.sport}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {session.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Brak zaplanowanych sesji
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Pływanie - Początkujący", sport: "Pływanie", icon: Waves, sessions: 8 },
              { name: "Triathlon - Kompletny", sport: "Triathlon", icon: Target, sessions: 16 },
              { name: "Bieganie - Maraton", sport: "Bieganie", icon: Footprints, sessions: 20 },
              { name: "Kolarstwo - Szosa", sport: "Kolarstwo", icon: Bike, sessions: 12 },
              { name: "Siłownia - Siła", sport: "Siłownia", icon: Dumbbell, sessions: 10 }
            ].map((template, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-card transition-all duration-200 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <template.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="bg-sport-accent">
                      {template.sessions} sesji
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>Szablon dla: {template.sport}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-border hover:bg-sport-accent">
                    Użyj Szablonu
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}