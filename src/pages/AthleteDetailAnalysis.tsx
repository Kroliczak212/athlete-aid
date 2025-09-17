import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainerFeedbackDialog } from "@/components/TrainerFeedbackDialog";
import { 
  Heart, 
  Activity, 
  Timer, 
  TrendingUp, 
  Zap,
  Brain,
  ArrowLeft,
  Calendar,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  MessageSquare
} from "lucide-react";

// Mock data for detailed athlete analysis
const mockAthleteAnalysis = {
  id: "1",
  name: "Anna Kowalska",
  sport: "Pływanie",
  avatar: "AK",
  recentMetrics: {
    avgHeartRate: 142,
    maxHeartRate: 185,
    restingHeartRate: 52,
    vo2Max: 58.2,
    avgPace: "1:25/100m",
    weeklyVolume: "12.5 km",
    trainingLoad: 420
  },
  weeklyProgress: {
    completed: 4,
    planned: 5,
    percentage: 80
  },
  aiInsights: [
    {
      type: "success",
      title: "Poprawa wydolności",
      description: "VO2 Max wzrósł o 3.2% w ostatnim miesiącu",
      confidence: 94,
      recommendation: "Kontynuuj obecny plan wytrzymałościowy"
    },
    {
      type: "warning", 
      title: "Wzrost tętna spoczynkowego",
      description: "Tętno spoczynkowe wzrosło z 48 do 52 bpm",
      confidence: 87,
      recommendation: "Rozważ dodatkowy dzień regeneracji"
    },
    {
      type: "info",
      title: "Stabilne tempo",
      description: "Konsystentne utrzymywanie tempa w strefie aerobowej",
      confidence: 91,
      recommendation: "Wprowadź więcej pracy w strefie progowej"
    }
  ],
  weeklyStats: [
    { day: "Pon", planned: true, completed: true, intensity: 7, duration: 90 },
    { day: "Wto", planned: true, completed: true, intensity: 5, duration: 60 },
    { day: "Śr", planned: true, completed: true, intensity: 8, duration: 120 },
    { day: "Czw", planned: true, completed: false, intensity: 6, duration: 75 },
    { day: "Pią", planned: true, completed: true, intensity: 9, duration: 45 },
    { day: "Sob", planned: false, completed: false, intensity: 0, duration: 0 },
    { day: "Nie", planned: true, completed: false, intensity: 4, duration: 90 }
  ],
  monthlyTrends: {
    performance: [85, 87, 89, 91, 88, 92, 94, 96],
    volume: [10, 11, 12, 13, 12, 14, 13, 12.5],
    intensity: [6.5, 6.8, 7.0, 7.2, 6.9, 7.4, 7.6, 7.3]
  }
};

export default function AthleteDetailAnalysis() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  
  const athlete = mockAthleteAnalysis;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/analyzer")}
            className="border-border"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                {athlete.avatar}
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                  {athlete.name}
                </h1>
                <p className="text-muted-foreground">{athlete.sport} • Analiza szczegółowa</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <TrainerFeedbackDialog athleteName={athlete.name}>
            <Button className="bg-primary hover:bg-sport-hover text-primary-foreground">
              <MessageSquare className="mr-2 h-4 w-4" />
              Wystawy uwagi
            </Button>
          </TrainerFeedbackDialog>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-xs text-muted-foreground">Śr. tętno</p>
                <p className="text-lg font-bold">{athlete.recentMetrics.avgHeartRate} bpm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">VO2 Max</p>
                <p className="text-lg font-bold">{athlete.recentMetrics.vo2Max}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Śr. tempo</p>
                <p className="text-lg font-bold">{athlete.recentMetrics.avgPace}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Objętość/tydzień</p>
                <p className="text-lg font-bold">{athlete.recentMetrics.weeklyVolume}</p>
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
          <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Analiza AI
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Postępy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Weekly Progress */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Postęp tygodniowy
                </CardTitle>
                <CardDescription>
                  {athlete.weeklyProgress.completed}/{athlete.weeklyProgress.planned} treningów ukończonych
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={athlete.weeklyProgress.percentage} className="h-3" />
                <div className="grid grid-cols-7 gap-1 text-center">
                  {athlete.weeklyStats.map((day, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground">{day.day}</div>
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs ${
                        day.completed 
                          ? 'bg-green-100 text-green-700 border-2 border-green-500' 
                          : day.planned 
                            ? 'bg-orange-100 text-orange-700 border-2 border-orange-500'
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {day.completed ? <CheckCircle className="h-4 w-4" /> : day.planned ? <AlertCircle className="h-4 w-4" /> : '-'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Load */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Obciążenie treningowe
                </CardTitle>
                <CardDescription>Aktualne obciążenie: {athlete.recentMetrics.trainingLoad} TSS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tętno spoczynkowe:</span>
                    <span className="font-medium">{athlete.recentMetrics.restingHeartRate} bpm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Maks. tętno:</span>
                    <span className="font-medium">{athlete.recentMetrics.maxHeartRate} bpm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge variant="secondary" className="bg-sport-accent">
                      Optymalny
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Analiza AI - Spostrzeżenia
              </CardTitle>
              <CardDescription>
                Automatyczna analiza danych treningowych i rekomendacje
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {athlete.aiInsights.map((insight, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'warning' 
                      ? 'bg-orange-50 border-l-orange-500 dark:bg-orange-950/20' 
                      : insight.type === 'success'
                      ? 'bg-green-50 border-l-green-500 dark:bg-green-950/20'
                      : 'bg-blue-50 border-l-blue-500 dark:bg-blue-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{insight.title}</h3>
                      <p className="text-muted-foreground mb-3">{insight.description}</p>
                      <div className="bg-sport-accent p-3 rounded-md">
                        <p className="text-sm font-medium">Rekomendacja:</p>
                        <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-muted-foreground">Pewność AI</div>
                      <div className="text-lg font-bold text-primary">{insight.confidence}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trend wydolności
                </CardTitle>
                <CardDescription>Ostatnie 8 tygodni</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {athlete.monthlyTrends.performance.map((value, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-16">Tydz. {index + 1}</span>
                      <Progress value={value} className="flex-1 h-2" />
                      <span className="text-sm font-medium w-12">{value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Osiągnięcia
                </CardTitle>
                <CardDescription>Ostatni miesiąc</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Poprawa VO2 Max o 3.2%</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">7-dniowa seria treningów</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                    <Target className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">Osiągnięcie celu tygodniowego</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}