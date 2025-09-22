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

      {/* Athlete Selection */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Wybierz sportowca do analizy</CardTitle>
          <CardDescription>
            Kliknij na kartę sportowca, aby przejść do szczegółowej analizy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {mockDeviceData.map((device, index) => (
              <Card 
                key={index} 
                className="border-border bg-card hover:shadow-card transition-all duration-200 cursor-pointer hover:border-primary/50"
                onClick={() => window.location.href = `/analyzer/athlete/${index + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{device.athlete}</h3>
                    <Badge 
                      variant={device.connected ? "default" : "destructive"}
                      className={device.connected ? "bg-green-100 text-green-800" : ""}
                    >
                      {device.connected ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{device.device}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-red-500" />
                      <span>{device.metrics.heartRate} bpm</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3 text-blue-500" />
                      <span>{device.metrics.distance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>


      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Porównaj Sportowców", icon: TrendingUp, desc: "Analiza względna", route: "/analyzer/compare" },
          { title: "Raport Tygodniowy", icon: Activity, desc: "Podsumowanie danych", route: "/analyzer/weekly-report" },
          { title: "Progi Treningowe", icon: Heart, desc: "Oblicz strefy tętna", route: "/analyzer/training-zones" },
          { title: "Predykcja Formy", icon: Brain, desc: "Przewiduj wydajność", route: "/analyzer/form-prediction" }
        ].map((action, index) => (
          <Card 
            key={index} 
            className="border-border bg-card hover:shadow-card transition-all duration-200 cursor-pointer"
            onClick={() => window.location.href = action.route}
          >
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