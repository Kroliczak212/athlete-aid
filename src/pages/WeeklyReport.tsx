import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Download, TrendingUp, Target, Clock } from 'lucide-react';

const mockWeeklyData = {
  athlete: 'Anna Kowalska',
  week: '14-20 Września 2024',
  totalSessions: 6,
  plannedSessions: 5,
  totalDistance: 23.5,
  totalTime: 420, // minutes
  avgHeartRate: 142,
  sessionsCompleted: [
    {
      date: '14.09',
      type: 'Technika',
      planned: true,
      completed: true,
      distance: 2.5,
      time: 45,
      avgHR: 138,
    },
    {
      date: '15.09',
      type: 'Wytrzymałość',
      planned: true,
      completed: true,
      distance: 5.2,
      time: 75,
      avgHR: 145,
    },
    {
      date: '17.09',
      type: 'Interwały',
      planned: true,
      completed: true,
      distance: 3.8,
      time: 60,
      avgHR: 158,
    },
    {
      date: '18.09',
      type: 'Regeneracja',
      planned: false,
      completed: true,
      distance: 2.0,
      time: 30,
      avgHR: 125,
    },
    {
      date: '19.09',
      type: 'Wytrzymałość',
      planned: true,
      completed: true,
      distance: 6.2,
      time: 90,
      avgHR: 142,
    },
    {
      date: '20.09',
      type: 'Sprint',
      planned: true,
      completed: true,
      distance: 3.8,
      time: 45,
      avgHR: 165,
    },
  ],
};

export default function WeeklyReport() {
  const [selectedAthlete, setSelectedAthlete] = useState('Anna Kowalska');
  const [selectedWeek, setSelectedWeek] = useState('current');

  const handleBack = () => {
    window.history.back();
  };

  const planAdherence =
    (mockWeeklyData.sessionsCompleted.filter((s) => s.planned).length /
      mockWeeklyData.plannedSessions) *
    100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Powrót
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Raport Tygodniowy</h1>
          <p className="text-muted-foreground">Szczegółowy raport aktywności treningowej</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Eksportuj PDF
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={selectedAthlete} onValueChange={setSelectedAthlete}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz sportowca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Anna Kowalska">Anna Kowalska</SelectItem>
                <SelectItem value="Tomasz Nowak">Tomasz Nowak</SelectItem>
                <SelectItem value="Maria Wiśniewska">Maria Wiśniewska</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz tydzień" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Bieżący tydzień (14-20 września)</SelectItem>
                <SelectItem value="last1">Poprzedni tydzień (7-13 września)</SelectItem>
                <SelectItem value="last2">2 tygodnie temu (31 sierpnia - 6 września)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sesje treningowe</p>
                <p className="text-2xl font-bold">{mockWeeklyData.totalSessions}</p>
                <p className="text-xs text-muted-foreground">
                  Zaplanowane: {mockWeeklyData.plannedSessions}
                </p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Całkowity dystans</p>
                <p className="text-2xl font-bold">{mockWeeklyData.totalDistance} km</p>
                <p className="text-xs text-green-600">+15% vs poprzedni tydzień</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Czas treningów</p>
                <p className="text-2xl font-bold">
                  {Math.floor(mockWeeklyData.totalTime / 60)}h {mockWeeklyData.totalTime % 60}min
                </p>
                <p className="text-xs text-muted-foreground">
                  Średnio: {Math.round(mockWeeklyData.totalTime / mockWeeklyData.totalSessions)}
                  min/sesja
                </p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Średnie tętno</p>
                <p className="text-2xl font-bold">{mockWeeklyData.avgHeartRate} bpm</p>
                <p className="text-xs text-muted-foreground">Strefa 2-3</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Adherence */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Realizacja planu treningowego</CardTitle>
          <CardDescription>Stopień przestrzegania zaplanowanych treningów</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Realizacja planu</span>
            <span className="text-lg font-bold text-primary">{Math.round(planAdherence)}%</span>
          </div>
          <div className="w-full bg-sport-accent rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${planAdherence}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Wykonano {mockWeeklyData.sessionsCompleted.filter((s) => s.planned).length} z{' '}
            {mockWeeklyData.plannedSessions} zaplanowanych sesji
          </p>
        </CardContent>
      </Card>

      {/* Session Details */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Szczegóły sesji treningowych</CardTitle>
          <CardDescription>
            {mockWeeklyData.week} - {mockWeeklyData.athlete}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockWeeklyData.sessionsCompleted.map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-sport-accent rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">{session.date}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{session.type}</span>
                      <Badge
                        variant={session.planned ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {session.planned ? 'Zaplanowane' : 'Dodatkowe'}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{session.distance} km</span>
                      <span>{session.time} min</span>
                      <span>Średnie HR: {session.avgHR} bpm</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Ukończone
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
