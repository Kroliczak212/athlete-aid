import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { 
  Heart, 
  Activity, 
  Timer, 
  TrendingUp, 
  ArrowLeft,
  Calendar,
  Target,
  Brain,
  MessageSquare,
  BarChart3,
  Zap
} from "lucide-react";

// Mock data for training details
const mockTrainingData = {
  id: "1",
  date: "2024-01-15",
  type: "Technika",
  athlete: "Anna Kowalska",
  duration: 90,
  status: "completed",
  plannedExercises: [
    {
      name: "Rozgrzewka",
      description: "Powolne rozpływanie z koncentracją na technice oddychania. Stopniowe zwiększanie tempa, aby przygotować mięśnie do głównej części treningu.",
      plannedDistance: "400m",
      plannedTime: "15 min",
      plannedIntensity: "70% maks"
    },
    {
      name: "Technika kraul",
      description: "Praca nad poprawą techniki wioślowania. Koncentracja na wysokim łokciu i efektywnym wyciągnięciu ręki.",
      plannedDistance: "8x50m",
      plannedTime: "25 min",
      plannedIntensity: "75% maks"
    },
    {
      name: "Interwały",
      description: "Wysokointensywna praca w strefie progowej. Utrzymanie stałego tempa i kontrola tętna.",
      plannedDistance: "4x100m",
      plannedTime: "35 min", 
      plannedIntensity: "85% maks"
    },
    {
      name: "Wyciszenie",
      description: "Powolne pływanie relaksacyjne. Koncentracja na głębokim oddychaniu i rozluźnieniu mięśni.",
      plannedDistance: "200m",
      plannedTime: "15 min",
      plannedIntensity: "60% maks"
    }
  ],
  actualData: {
    totalTime: 88,
    totalDistance: "1.1 km",
    avgHeartRate: 145,
    maxHeartRate: 172,
    avgPace: "1:28/100m",
    calories: 456,
    zones: {
      zone1: 25, // % czasu w strefie 1
      zone2: 35,
      zone3: 30,
      zone4: 8,
      zone5: 2
    }
  },
  heartRateData: [
    { time: 0, hr: 85 },
    { time: 5, hr: 120 },
    { time: 10, hr: 135 },
    { time: 15, hr: 142 },
    { time: 20, hr: 158 },
    { time: 25, hr: 165 },
    { time: 30, hr: 172 },
    { time: 35, hr: 168 },
    { time: 40, hr: 175 },
    { time: 45, hr: 170 },
    { time: 50, hr: 162 },
    { time: 55, hr: 155 },
    { time: 60, hr: 148 },
    { time: 65, hr: 140 },
    { time: 70, hr: 132 },
    { time: 75, hr: 125 },
    { time: 80, hr: 118 },
    { time: 85, hr: 105 },
    { time: 88, hr: 95 }
  ],
  paceData: [
    { time: 0, pace: 0 },
    { time: 5, pace: 95 },
    { time: 10, pace: 88 },
    { time: 15, pace: 85 },
    { time: 20, pace: 82 },
    { time: 25, pace: 78 },
    { time: 30, pace: 75 },
    { time: 35, pace: 77 },
    { time: 40, pace: 74 },
    { time: 45, pace: 76 },
    { time: 50, pace: 80 },
    { time: 55, pace: 85 },
    { time: 60, pace: 88 },
    { time: 65, pace: 92 },
    { time: 70, pace: 95 },
    { time: 75, pace: 98 },
    { time: 80, pace: 102 },
    { time: 85, pace: 105 },
    { time: 88, pace: 110 }
  ],
  aiAnalysis: {
    title: "Analiza wykonania treningu",
    insights: [
      {
        type: "success",
        title: "Doskonałe utrzymanie tempa",
        description: "Sportowiec bardzo dobrze utrzymał planowane tempo w sekcji interwałowej. Różnica między planowanym a rzeczywistym tempem wynosiła tylko 2%.",
        confidence: 94
      },
      {
        type: "warning",
        title: "Przekroczenie strefy tętna",
        description: "W 3 momentach treningu tętno przekroczyło strefę progową o więcej niż 10 bpm, co może wskazywać na zbyt wysoką intensywność.",
        confidence: 87
      },
      {
        type: "info",
        title: "Dobra technika oddychania",
        description: "Regularność tętna wskazuje na kontrolowane oddychanie przez większość treningu.",
        confidence: 91
      }
    ],
    recommendations: [
      "W następnym treningu rozważ rozpoczęcie interwałów z nieco niższą intensywnością",
      "Kontynuuj pracę nad techniką - rezultaty są bardzo dobre",
      "Rozważ wydłużenie fazy wyciszenia do 20 minut"
    ]
  },
  trainerFeedback: ""
};

export default function TrainingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [trainerNotes, setTrainerNotes] = useState(mockTrainingData.trainerFeedback);
  
  const training = mockTrainingData;

  const handleSaveNotes = () => {
    // Here would be API call to save trainer notes
    console.log("Saving trainer notes:", trainerNotes);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(-1)}
            className="border-border"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Szczegóły treningu
            </h1>
            <p className="text-muted-foreground">
              {training.athlete} • {training.date} • {training.type}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={training.status === "completed" ? "default" : "secondary"}>
            {training.status === "completed" ? "Ukończony" : "W trakcie"}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Czas</p>
                <p className="text-lg font-bold">{training.actualData.totalTime} min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Dystans</p>
                <p className="text-lg font-bold">{training.actualData.totalDistance}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-xs text-muted-foreground">Śr. tętno</p>
                <p className="text-lg font-bold">{training.actualData.avgHeartRate} bpm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Kalorie</p>
                <p className="text-lg font-bold">{training.actualData.calories}</p>
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
          <TabsTrigger value="plan" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Plan treningu
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Analiza AI
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Uwagi trenera
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Heart Rate Chart */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Tętno podczas treningu
                </CardTitle>
                <CardDescription>
                  Śr: {training.actualData.avgHeartRate} bpm • Maks: {training.actualData.maxHeartRate} bpm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={training.heartRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="hr" 
                      stroke="#ef4444" 
                      fill="#ef444410"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pace Chart */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Tempo podczas treningu
                </CardTitle>
                <CardDescription>
                  Średnie tempo: {training.actualData.avgPace}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={training.paceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="pace" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Training Zones */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Strefy treningowe</CardTitle>
              <CardDescription>Rozkład czasu treningu w poszczególnych strefach tętna</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(training.actualData.zones).map(([zone, percentage]) => (
                  <div key={zone} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-16">Strefa {zone.slice(-1)}</span>
                    <Progress value={percentage} className="flex-1 h-3" />
                    <span className="text-sm font-medium w-12">{percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Plan treningowy zadany przez trenera
              </CardTitle>
              <CardDescription>
                Szczegółowy plan ćwiczeń na dzisiejszy trening
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {training.plannedExercises.map((exercise, index) => (
                  <div key={index} className="p-4 bg-sport-accent rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{exercise.name}</h3>
                        <p className="text-muted-foreground mb-3">{exercise.description}</p>
                      </div>
                      <Badge variant="outline" className="ml-2">{exercise.plannedTime}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span>Dystans: {exercise.plannedDistance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-green-500" />
                        <span>Czas: {exercise.plannedTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-orange-500" />
                        <span>Intensywność: {exercise.plannedIntensity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                {training.aiAnalysis.title}
              </CardTitle>
              <CardDescription>
                Automatyczna analiza wykonania treningu w porównaniu z planem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {training.aiAnalysis.insights.map((insight, index) => (
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
                      <p className="text-muted-foreground">{insight.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-muted-foreground">Pewność</div>
                      <div className="text-lg font-bold text-primary">{insight.confidence}%</div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-sport-accent p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Rekomendacje AI:</h3>
                <ul className="space-y-2">
                  {training.aiAnalysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Uwagi i feedback trenera
              </CardTitle>
              <CardDescription>
                Miejsce na dodatkowe komentarze i wskazówki dla sportowca
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Dodaj swoje uwagi i feedback dla sportowca..."
                value={trainerNotes}
                onChange={(e) => setTrainerNotes(e.target.value)}
                className="min-h-[150px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleSaveNotes} className="bg-primary hover:bg-sport-hover">
                  Zapisz uwagi
                </Button>
              </div>
              
              {trainerNotes && (
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-l-blue-500">
                  <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                    Zapisane uwagi:
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm whitespace-pre-wrap">
                    {trainerNotes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}