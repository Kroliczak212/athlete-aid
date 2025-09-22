import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Calculator, Heart, Info } from 'lucide-react';

const zoneColors = [
  { name: 'Strefa 1 - Regeneracja', color: 'bg-blue-100 text-blue-800', range: '50-60%' },
  {
    name: 'Strefa 2 - Wytrzymałość podstawowa',
    color: 'bg-green-100 text-green-800',
    range: '60-70%',
  },
  { name: 'Strefa 3 - Tempo umiarkowane', color: 'bg-yellow-100 text-yellow-800', range: '70-80%' },
  { name: 'Strefa 4 - Próg beztlenowy', color: 'bg-orange-100 text-orange-800', range: '80-90%' },
  { name: 'Strefa 5 - Moc beztlenowa', color: 'bg-red-100 text-red-800', range: '90-100%' },
];

type Zone = {
  zone: number;
  name: string;
  min: number;
  max: number;
  color: string;
};

export default function TrainingZones() {
  const [age, setAge] = useState('');
  const [maxHR, setMaxHR] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [method, setMethod] = useState('karvonen');
  const [zones, setZones] = useState<Zone[]>([]);

  const handleBack = () => {
    window.history.back();
  };

  const calculateZones = () => {
    const ageNum = parseInt(age);
    const maxHRNum = maxHR ? parseInt(maxHR) : 220 - ageNum;
    const restingHRNum = parseInt(restingHR || '60');

    let calculatedZones = [];

    if (method === 'karvonen') {
      // Metoda Karvonena (HRR - Heart Rate Reserve)
      const hrReserve = maxHRNum - restingHRNum;

      calculatedZones = [
        {
          zone: 1,
          name: 'Regeneracja',
          min: Math.round(restingHRNum + hrReserve * 0.5),
          max: Math.round(restingHRNum + hrReserve * 0.6),
          color: 'bg-blue-100 text-blue-800',
        },
        {
          zone: 2,
          name: 'Wytrzymałość podstawowa',
          min: Math.round(restingHRNum + hrReserve * 0.6),
          max: Math.round(restingHRNum + hrReserve * 0.7),
          color: 'bg-green-100 text-green-800',
        },
        {
          zone: 3,
          name: 'Tempo umiarkowane',
          min: Math.round(restingHRNum + hrReserve * 0.7),
          max: Math.round(restingHRNum + hrReserve * 0.8),
          color: 'bg-yellow-100 text-yellow-800',
        },
        {
          zone: 4,
          name: 'Próg beztlenowy',
          min: Math.round(restingHRNum + hrReserve * 0.8),
          max: Math.round(restingHRNum + hrReserve * 0.9),
          color: 'bg-orange-100 text-orange-800',
        },
        {
          zone: 5,
          name: 'Moc beztlenowa',
          min: Math.round(restingHRNum + hrReserve * 0.9),
          max: maxHRNum,
          color: 'bg-red-100 text-red-800',
        },
      ];
    } else {
      // Metoda % HRmax
      calculatedZones = [
        {
          zone: 1,
          name: 'Regeneracja',
          min: Math.round(maxHRNum * 0.5),
          max: Math.round(maxHRNum * 0.6),
          color: 'bg-blue-100 text-blue-800',
        },
        {
          zone: 2,
          name: 'Wytrzymałość podstawowa',
          min: Math.round(maxHRNum * 0.6),
          max: Math.round(maxHRNum * 0.7),
          color: 'bg-green-100 text-green-800',
        },
        {
          zone: 3,
          name: 'Tempo umiarkowane',
          min: Math.round(maxHRNum * 0.7),
          max: Math.round(maxHRNum * 0.8),
          color: 'bg-yellow-100 text-yellow-800',
        },
        {
          zone: 4,
          name: 'Próg beztlenowy',
          min: Math.round(maxHRNum * 0.8),
          max: Math.round(maxHRNum * 0.9),
          color: 'bg-orange-100 text-orange-800',
        },
        {
          zone: 5,
          name: 'Moc beztlenowa',
          min: Math.round(maxHRNum * 0.9),
          max: maxHRNum,
          color: 'bg-red-100 text-red-800',
        },
      ];
    }

    setZones(calculatedZones);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Powrót
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kalkulator Progów Treningowych</h1>
          <p className="text-muted-foreground">Oblicz personalizowane strefy tętna dla sportowca</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calculator */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Parametry kalkulacji
            </CardTitle>
            <CardDescription>
              Wprowadź dane sportowca aby obliczyć strefy treningowe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Wiek (lata)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resting-hr">Tętno spoczynkowe (bpm)</Label>
                <Input
                  id="resting-hr"
                  type="number"
                  placeholder="60"
                  value={restingHR}
                  onChange={(e) => setRestingHR(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-hr">Maksymalne tętno (bpm) - opcjonalne</Label>
              <Input
                id="max-hr"
                type="number"
                placeholder="Zostanie obliczone automatycznie"
                value={maxHR}
                onChange={(e) => setMaxHR(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Jeśli nie podasz, zostanie obliczone wzorem: 220 - wiek
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Metoda obliczania</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz metodę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karvonen">Metoda Karvonena (zalecana)</SelectItem>
                  <SelectItem value="hrmax">% Maksymalnego tętna</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={calculateZones}
              disabled={!age}
              className="w-full bg-primary hover:bg-sport-hover text-primary-foreground"
            >
              <Heart className="h-4 w-4 mr-2" />
              Oblicz strefy treningowe
            </Button>
          </CardContent>
        </Card>

        {/* Method Info */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Informacje o metodach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-sport-accent rounded-lg">
                <h4 className="font-semibold text-sm">Metoda Karvonena (zalecana)</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Uwzględnia tętno spoczynkowe, co czyni ją bardziej precyzyjną dla każdego
                  sportowca. Wzór: (HRmax - HRrest) × % + HRrest
                </p>
              </div>

              <div className="p-3 bg-sport-accent rounded-lg">
                <h4 className="font-semibold text-sm">% Maksymalnego tętna</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Prosta metoda oparta tylko na maksymalnym tętnie. Wzór: HRmax × %
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Strefy treningowe:</h4>
              <div className="space-y-2">
                {zoneColors.map((zone, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-sport-accent rounded text-sm"
                  >
                    <span className="font-medium">{zone.name}</span>
                    <span className="text-xs text-muted-foreground">{zone.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {zones.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Obliczone strefy treningowe</CardTitle>
            <CardDescription>
              Personalizowane strefy tętna na podstawie wprowadzonych danych
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {zones.map((zone) => (
                <div
                  key={zone.zone}
                  className="p-4 border border-border rounded-lg bg-sport-accent"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Strefa {zone.zone}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${zone.color}`}>
                      {zone.min}-{zone.max} bpm
                    </span>
                  </div>
                  <h4 className="font-medium text-sm">{zone.name}</h4>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-l-blue-500">
              <h4 className="font-semibold text-sm mb-2">Jak wykorzystać strefy:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Strefa 1-2: Budowanie bazy wytrzymałościowej (80% treningów)</li>
                <li>• Strefa 3: Tempo wyścigowe dla dystansów długich</li>
                <li>• Strefa 4: Praca na progu beztlenowym</li>
                <li>• Strefa 5: Krótkie interwały maksymalnej mocy</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
