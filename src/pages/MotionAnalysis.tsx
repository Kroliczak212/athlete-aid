import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Video, Brain, Upload, Play, Settings, BarChart3, AlertCircle } from 'lucide-react';

export default function MotionAnalysis() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analiza Ruchu AI</h1>
          <p className="text-muted-foreground">
            Zaawansowana analiza techniki ruchu z wykorzystaniem sztucznej inteligencji
          </p>
        </div>
        <Badge variant="outline" className="border-orange-500 text-orange-600">
          Wkrótce dostępne
        </Badge>
      </div>

      {/* Coming Soon Hero */}
      <Card className="border-border bg-gradient-to-br from-card to-sport-accent">
        <CardContent className="p-12 text-center">
          <Brain className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-4">Analiza Ruchu AI</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Przyszłość analizy sportowej - automatyczne rozpoznawanie i ocena techniki ruchu z
            wykorzystaniem najnowszych algorytmów sztucznej inteligencji i wizji komputerowej.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport"
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            Powiadom o dostępności
          </Button>
        </CardContent>
      </Card>

      {/* Feature Preview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader>
            <Camera className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Analiza w Czasie Rzeczywistym</CardTitle>
            <CardDescription>Natychmiastowa analiza techniki podczas treningu</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Rozpoznawanie kluczowych punktów ciała</li>
              <li>• Analiza biomechaniki ruchu</li>
              <li>• Natychmiastowe informacje zwrotne</li>
              <li>• Porównanie z wzorcami technicznymi</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <Video className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Analiza Nagrań</CardTitle>
            <CardDescription>Szczegółowa ocena nagranych sesji treningowych</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Upload filmów z telefonów/kamer</li>
              <li>• Automatyczne wykrywanie błędów</li>
              <li>• Porównanie przed/po treningach</li>
              <li>• Eksport raportów PDF</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Raporty i Progres</CardTitle>
            <CardDescription>Śledzenie poprawy techniki w czasie</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Wykresy postępów techniki</li>
              <li>• Porównanie między sportowcami</li>
              <li>• Personalizowane rekomendacje</li>
              <li>• Integracja z planami treningowymi</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Mock Interface Preview */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Podgląd Interfejsu
          </CardTitle>
          <CardDescription>Tak będzie wyglądać moduł analizy ruchu po uruchomieniu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-sport-accent rounded-lg p-8 text-center">
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="bg-card p-4 rounded-lg border border-border">
                <Upload className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">1. Upload Video</p>
                <p className="text-xs text-muted-foreground">Prześlij nagranie</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <Brain className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">2. AI Analysis</p>
                <p className="text-xs text-muted-foreground">Analiza ruchu</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">3. Get Report</p>
                <p className="text-xs text-muted-foreground">Otrzymaj wyniki</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-12 bg-background/50">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">Obszar analizy video</p>
              <p className="text-sm text-muted-foreground">
                Tutaj pojawi się player video z nałożonymi punktami analizy ruchu
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Bądź na bieżąco</CardTitle>
          <CardDescription>
            Zostaw email, aby otrzymać powiadomienie o uruchomieniu modułu analizy ruchu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 max-w-md">
            <input
              type="email"
              placeholder="twoj@email.com"
              className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground"
            />
            <Button className="bg-primary hover:bg-sport-hover text-primary-foreground">
              Zapisz się
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Nie wysyłamy spamu. Tylko ważne informacje o nowych funkcjach.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
