import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Clock } from "lucide-react";

export default function FormPrediction() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Powrót
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Predykcja Formy</h1>
          <p className="text-muted-foreground">
            AI-powered przewidywanie wydajności sportowej
          </p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-12 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-center">
              <div className="relative">
                <Brain className="h-16 w-16 text-primary" />
                <Clock className="h-6 w-6 text-muted-foreground absolute -bottom-1 -right-1" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Wkrótce dostępne!</h2>
              <p className="text-muted-foreground">
                Pracujemy nad zaawansowanym systemem AI, który będzie przewidywać formę sportową na podstawie:
              </p>
            </div>

            <div className="text-left space-y-2 bg-sport-accent p-4 rounded-lg">
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Analiza trendów treningowych</li>
                <li>• Dane biometryczne i HRV</li>
                <li>• Historia wyników zawodów</li>
                <li>• Cykle treningowe i regeneracja</li>
                <li>• Zewnętrzne czynniki (pogoda, stres)</li>
              </ul>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Funkcja będzie dostępna w kolejnej aktualizacji systemu.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}