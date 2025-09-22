import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Clock, Target, Calendar, Download, Copy } from 'lucide-react';

const mockTemplateDetails = {
  'swimming-beginner': {
    name: 'Pływanie - Początkujący',
    sport: 'Pływanie',
    level: 'Początkujący',
    duration: '8 tygodni',
    sessionsPerWeek: 2,
    totalSessions: 16,
    description:
      'Podstawowy plan treningowy dla osób rozpoczynających przygodę z pływaniem. Skupia się na nauce podstawowych technik pływackich oraz budowaniu podstawowej kondycji.',
    goals: [
      'Nauka techniki kraul i grzbiet',
      'Budowanie wytrzymałości oddechowej',
      'Podstawy techniki pływania',
      'Bezpieczne poruszanie się w wodzie',
    ],
    equipment: [
      'Kostium kąpielowy',
      'Okulary pływackie',
      'Czepek (opcjonalnie)',
      'Deska do pływania',
      'Pullbuoy',
    ],
    weeklyStructure: [
      {
        week: '1-2',
        focus: 'Adaptacja wodna',
        sessions: [
          {
            day: 'Poniedziałek',
            duration: 45,
            exercises: [
              'Rozgrzewka na brzegu - 5 min',
              'Adaptacja wodna - chodzenie w wodzie - 10 min',
              'Podstawy kraul - 4x25m z przerwami',
              'Ćwiczenia oddechowe - 5 min',
              'Swobodne pływanie - 10 min',
            ],
          },
          {
            day: 'Środa',
            duration: 45,
            exercises: [
              'Rozgrzewka - 5 min chodzenia w wodzie',
              'Technika grzbiet - 4x25m',
              'Kraul z deską - 6x25m',
              'Ćwiczenia nog - 5 min',
              'Wyciszenie - 5 min swobodnego pływania',
            ],
          },
        ],
      },
      {
        week: '3-4',
        focus: 'Podstawowa technika',
        sessions: [
          {
            day: 'Poniedziałek',
            duration: 60,
            exercises: [
              'Rozgrzewka - 100m swobodnie',
              'Technika kraul - 6x50m',
              'Ćwiczenia oddechowe - 8x25m',
              'Podstawy grzbiet - 4x50m',
              'Wyciszenie - 100m spokojnie',
            ],
          },
          {
            day: 'Środa',
            duration: 60,
            exercises: [
              'Rozgrzewka - 150m mieszanką',
              'Kraul z pullbuoy - 6x50m',
              'Ćwiczenia nog grzbiet - 4x50m',
              'Technika kraul kompletna - 4x50m',
              'Wyciszenie - 100m dowolnym stylem',
            ],
          },
        ],
      },
    ],
    tips: [
      'Zawsze rozpoczynaj trening od rozgrzewki',
      'Skup się na technice, a nie na szybkości',
      'Regularność jest kluczowa - nie opuszczaj treningów',
      'Pij dużo wody przed i po treningu',
      'Słuchaj swojego ciała - odpoczywaj gdy potrzebujesz',
    ],
  },
};

export default function TemplateDetails() {
  const { id } = useParams();
  const template =
    mockTemplateDetails[id as keyof typeof mockTemplateDetails] ||
    mockTemplateDetails['swimming-beginner'];

  const handleUseTemplate = () => {
    // Logic to use template
    console.log('Using template:', template.name);
  };

  const handleCopyTemplate = () => {
    // Logic to copy template
    console.log('Copying template:', template.name);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/training">
          <Button variant="outline" size="sm" className="border-border hover:bg-sport-accent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót do szablonów
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{template.name}</h1>
          <p className="text-muted-foreground">Szablon treningowy • {template.sport}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCopyTemplate}
            className="border-border hover:bg-sport-accent"
          >
            <Copy className="mr-2 h-4 w-4" />
            Kopiuj
          </Button>
          <Button
            onClick={handleUseTemplate}
            className="bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport"
          >
            <Download className="mr-2 h-4 w-4" />
            Użyj szablonu
          </Button>
        </div>
      </div>

      {/* Template Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Poziom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="bg-sport-accent">
              {template.level}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Czas trwania
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{template.duration}</div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Sesje/tydzień
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{template.sessionsPerWeek}</div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Łącznie sesji
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{template.totalSessions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Opis szablonu</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{template.description}</p>
        </CardContent>
      </Card>

      {/* Goals & Equipment */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Cele treningowe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {template.goals.map((goal, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Wymagany sprzęt</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {template.equipment.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Structure */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Struktura treningowa</CardTitle>
          <CardDescription>Szczegółowy rozkład ćwiczeń według tygodni</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {template.weeklyStructure.map((period, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  Tydzień {period.week}
                </Badge>
                <h3 className="font-semibold">{period.focus}</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {period.sessions.map((session, sessionIndex) => (
                  <Card key={sessionIndex} className="border-border bg-sport-accent">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{session.day}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {session.duration} min
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {session.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className="text-sm">
                          <span className="text-primary mr-2">•</span>
                          {exercise}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Wskazówki dla trenerów</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {template.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-sport-accent rounded-lg">
                <span className="text-primary font-bold mt-0.5">💡</span>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
