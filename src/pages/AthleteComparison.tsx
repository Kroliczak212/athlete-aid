import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ArrowLeft, TrendingUp, Users } from "lucide-react";

const mockAthletes = [
  { id: "1", name: "Anna Kowalska", sport: "Pływanie" },
  { id: "2", name: "Tomasz Nowak", sport: "Triathlon" },
  { id: "3", name: "Maria Wiśniewska", sport: "Bieganie" }
];

const mockComparisonData = [
  { week: "Tydzień 1", athlete1: 142, athlete2: 156, distance1: 15.2, distance2: 18.1 },
  { week: "Tydzień 2", athlete1: 145, athlete2: 152, distance1: 16.8, distance2: 19.5 },
  { week: "Tydzień 3", athlete1: 140, athlete2: 158, distance1: 18.1, distance2: 20.2 },
  { week: "Tydzień 4", athlete1: 138, athlete2: 154, distance1: 17.5, distance2: 21.8 }
];

export default function AthleteComparison() {
  const [athlete1, setAthlete1] = useState("");
  const [athlete2, setAthlete2] = useState("");
  const [comparisonType, setComparisonType] = useState("athletes");

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
          <h1 className="text-3xl font-bold tracking-tight">Porównanie Sportowców</h1>
          <p className="text-muted-foreground">
            Porównaj wyniki między sportowcami lub różnymi okresami
          </p>
        </div>
      </div>

      {/* Comparison Type Selection */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Typ porównania
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={comparisonType} onValueChange={setComparisonType}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz typ porównania" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="athletes">Porównaj dwóch sportowców</SelectItem>
                <SelectItem value="periods">Porównaj 2 tygodnie jednego sportowca</SelectItem>
              </SelectContent>
            </Select>

            {comparisonType === "athletes" ? (
              <>
                <Select value={athlete1} onValueChange={setAthlete1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz pierwszego sportowca" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAthletes.map((athlete) => (
                      <SelectItem key={athlete.id} value={athlete.name}>
                        {athlete.name} - {athlete.sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={athlete2} onValueChange={setAthlete2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz drugiego sportowca" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAthletes.filter(a => a.name !== athlete1).map((athlete) => (
                      <SelectItem key={athlete.id} value={athlete.name}>
                        {athlete.name} - {athlete.sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            ) : (
              <>
                <Select value={athlete1} onValueChange={setAthlete1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz sportowca" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAthletes.map((athlete) => (
                      <SelectItem key={athlete.id} value={athlete.name}>
                        {athlete.name} - {athlete.sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pierwszy okres" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week1">Tydzień 1-4</SelectItem>
                      <SelectItem value="week2">Tydzień 5-8</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Drugi okres" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week3">Tydzień 9-12</SelectItem>
                      <SelectItem value="week4">Tydzień 13-16</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Charts */}
      {athlete1 && (comparisonType === "periods" || athlete2) && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Średnie tętno</CardTitle>
              <CardDescription>
                Porównanie średniego tętna podczas treningów
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="athlete1" 
                    stroke="hsl(var(--primary))" 
                    name={comparisonType === "athletes" ? athlete1 : "Pierwszy okres"}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="athlete2" 
                    stroke="hsl(var(--secondary))" 
                    name={comparisonType === "athletes" ? athlete2 : "Drugi okres"}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Dystans tygodniowy</CardTitle>
              <CardDescription>
                Porównanie pokonanego dystansu w km
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="distance1" 
                    fill="hsl(var(--primary))" 
                    name={comparisonType === "athletes" ? athlete1 : "Pierwszy okres"}
                  />
                  <Bar 
                    dataKey="distance2" 
                    fill="hsl(var(--secondary))" 
                    name={comparisonType === "athletes" ? athlete2 : "Drugi okres"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Summary */}
      {athlete1 && (comparisonType === "periods" || athlete2) && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Analiza porównawcza
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-sport-accent rounded-lg">
                <h3 className="font-semibold text-lg">Średnie tętno</h3>
                <p className="text-2xl font-bold text-primary">143 vs 155 bpm</p>
                <p className="text-sm text-muted-foreground">Różnica: 12 bpm</p>
              </div>
              <div className="p-4 bg-sport-accent rounded-lg">
                <h3 className="font-semibold text-lg">Dystans tygodniowy</h3>
                <p className="text-2xl font-bold text-primary">16.9 vs 19.9 km</p>
                <p className="text-sm text-muted-foreground">Różnica: 3.0 km</p>
              </div>
              <div className="p-4 bg-sport-accent rounded-lg">
                <h3 className="font-semibold text-lg">Poprawa</h3>
                <p className="text-2xl font-bold text-green-600">+7.5%</p>
                <p className="text-sm text-muted-foreground">Wydajność</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}