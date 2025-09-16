import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Activity, 
  Timer, 
  TrendingUp, 
  Zap,
  Brain,
  Bluetooth,
  Upload
} from "lucide-react";

const mockDeviceData = [
  {
    athlete: "Anna Kowalska",
    device: "Garmin Forerunner 945",
    connected: true,
    lastSync: "2 min temu",
    battery: 85,
    metrics: {
      heartRate: 142,
      pace: "4:32/km",
      distance: "5.2 km",
      calories: 312
    }
  },
  {
    athlete: "Tomasz Nowak", 
    device: "Polar Vantage V2",
    connected: true,
    lastSync: "5 min temu",
    battery: 67,
    metrics: {
      heartRate: 156,
      pace: "4:18/km", 
      distance: "8.1 km",
      calories: 486
    }
  },
  {
    athlete: "Maria Wiśniewska",
    device: "Apple Watch Ultra",
    connected: false,
    lastSync: "1 godz. temu",
    battery: 42,
    metrics: {
      heartRate: 138,
      pace: "5:12/km",
      distance: "3.8 km", 
      calories: 245
    }
  }
];

const mockAIInsights = [
  {
    type: "warning",
    title: "Wzrost tętna spoczynkowego",
    athlete: "Anna Kowalska",
    description: "Tętno spoczynkowe wzrosło o 8 bpm w ostatnim tygodniu. Może wskazywać na przemęczenie.",
    confidence: 87,
    recommendation: "Zalecany dzień odpoczynku lub lekki trening regeneracyjny."
  },
  {
    type: "success", 
    title: "Poprawa wytrzymałości",
    athlete: "Tomasz Nowak",
    description: "Tempo przy tej samej wartości tętna poprawiło się o 15 sek/km w ostatnim miesiącu.",
    confidence: 94,
    recommendation: "Kontynuuj obecny plan treningowy. Rozważ zwiększenie intensywności."
  },
  {
    type: "info",
    title: "Nieregularne treningi",
    athlete: "Maria Wiśniewska", 
    description: "Wykryto nieregularność w harmonogramie treningów. 3 pominięte sesje w tym tygodniu.",
    confidence: 76,
    recommendation: "Skonsultuj się z trenerem w sprawie dostosowania planu treningowego."
  }
];

export default function AIAnalyzer() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analizator AI</h1>
          <p className="text-muted-foreground">
            Analiza danych z opasek sportowych i urządzeń fitness
          </p>
        </div>
        <Button className="bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport">
          <Upload className="mr-2 h-4 w-4" />
          Importuj Dane
        </Button>
      </div>

      {/* Device Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDeviceData.map((device, index) => (
          <Card key={index} className="border-border bg-card hover:shadow-card transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bluetooth className={`h-5 w-5 ${device.connected ? 'text-green-600' : 'text-red-500'}`} />
                  <Badge 
                    variant={device.connected ? "default" : "destructive"}
                    className={device.connected ? "bg-green-100 text-green-800" : ""}
                  >
                    {device.connected ? "Połączony" : "Rozłączony"}
                  </Badge>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  Bateria: {device.battery}%
                </div>
              </div>
              <CardTitle className="text-lg">{device.athlete}</CardTitle>
              <CardDescription>{device.device}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-xs text-muted-foreground">
                Ostatnia synchronizacja: {device.lastSync}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <div>
                    <div className="text-sm font-medium">{device.metrics.heartRate} bpm</div>
                    <div className="text-xs text-muted-foreground">Tętno</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium">{device.metrics.pace}</div>
                    <div className="text-xs text-muted-foreground">Tempo</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-sm font-medium">{device.metrics.distance}</div>
                    <div className="text-xs text-muted-foreground">Dystans</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <div>
                    <div className="text-sm font-medium">{device.metrics.calories} kcal</div>
                    <div className="text-xs text-muted-foreground">Kalorie</div>
                  </div>
                </div>
              </div>
              
              <Progress value={device.battery} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
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
          {mockAIInsights.map((insight, index) => (
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
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{insight.title}</h3>
                    <Badge variant="secondary" className="text-xs bg-sport-accent">
                      {insight.athlete}
                    </Badge>
                  </div>
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

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Porównaj Sportowców", icon: TrendingUp, desc: "Analiza względna" },
          { title: "Raport Tygodniowy", icon: Activity, desc: "Podsumowanie danych" },
          { title: "Progi Treningowe", icon: Heart, desc: "Oblicz strefy tętna" },
          { title: "Predykcja Formy", icon: Brain, desc: "Przewiduj wydajność" }
        ].map((action, index) => (
          <Card key={index} className="border-border bg-card hover:shadow-card transition-all duration-200 cursor-pointer">
            <CardContent className="p-6 text-center">
              <action.icon className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-semibold">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}