import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Target,
  Activity,
  Award,
  TrendingUp,
  Heart,
  Zap,
  Edit
} from "lucide-react";

const mockAthleteData = {
  id: "1",
  name: "Anna Kowalska",
  email: "anna.kowalska@email.com",
  phone: "+48 123 456 789",
  sport: "Pływanie",
  joinDate: "15.03.2024",
  age: 24,
  emergencyContact: "Maria Kowalska (+48 987 654 321)",
  paymentStatus: "paid",
  nextPayment: "15.10.2024",
  monthlyFee: "200 zł",
  currentPlan: "Plan Zaawansowany",
  activePlans: [
    {
      name: "Plan Zaawansowany",
      progress: 75,
      nextSession: "15.09.2024 18:00",
      type: "Technika"
    }
  ],
  stats: {
    totalSessions: 45,
    completedSessions: 38,
    attendanceRate: 84,
    avgHeartRate: 152,
    maxHeartRate: 185,
    personalBests: [
      { distance: "50m kraul", time: "26.45s", date: "10.09.2024" },
      { distance: "100m kraul", time: "58.23s", date: "05.09.2024" },
      { distance: "200m kraul", time: "2:05.67", date: "01.09.2024" }
    ]
  },
  recentActivity: [
    { date: "12.09.2024", activity: "Sesja techniczna", duration: "90 min", notes: "Dobra praca nad startem" },
    { date: "10.09.2024", activity: "Trening wytrzymałościowy", duration: "120 min", notes: "Nowy rekord osobisty na 50m" },
    { date: "08.09.2024", activity: "Sesja sprint", duration: "75 min", notes: "Praca nad techniką obrotu" }
  ]
};

export default function AthleteProfile() {
  const { id } = useParams();
  const athlete = mockAthleteData; // In real app, fetch by id

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="border-border hover:bg-sport-accent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Profil Sportowca</h1>
          <p className="text-muted-foreground">Szczegółowe informacje i statystyki</p>
        </div>
        <Button className="bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport">
          <Edit className="mr-2 h-4 w-4" />
          Edytuj Profil
        </Button>
      </div>

      {/* Basic Info */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {athlete.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{athlete.name}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-1">
                  <Badge variant="secondary" className="bg-sport-accent">
                    {athlete.sport}
                  </Badge>
                  <span>Wiek: {athlete.age} lat</span>
                  <span>W klubie od: {athlete.joinDate}</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{athlete.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{athlete.phone}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Kontakt awaryjny</p>
                <p className="text-sm font-medium">{athlete.emergencyContact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Płatności
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={athlete.paymentStatus === 'paid' ? 'secondary' : 'destructive'}>
                {athlete.paymentStatus === 'paid' ? 'Opłacone' : 'Zaległe'}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Składka miesięczna</span>
                <span className="font-medium">{athlete.monthlyFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Następna płatność</span>
                <span className="font-medium">{athlete.nextPayment}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Plan */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Aktualny Plan Treningowy
          </CardTitle>
        </CardHeader>
        <CardContent>
          {athlete.activePlans.map((plan, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Następna sesja: {plan.nextSession} ({plan.type})
                  </p>
                </div>
                <Link to={`/training/plan/1`}>
                  <Button variant="outline" size="sm" className="border-border hover:bg-sport-accent">
                    Zobacz szczegóły
                  </Button>
                </Link>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Postęp planu</span>
                  <span className="font-medium">{plan.progress}%</span>
                </div>
                <Progress value={plan.progress} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Frekwencja
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{athlete.stats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              {athlete.stats.completedSessions}/{athlete.stats.totalSessions} sesji
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Średnie tętno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{athlete.stats.avgHeartRate}</div>
            <p className="text-xs text-muted-foreground">BPM</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Maks. tętno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{athlete.stats.maxHeartRate}</div>
            <p className="text-xs text-muted-foreground">BPM</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Sesje w tym miesiącu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 vs poprzedni</p>
          </CardContent>
        </Card>
      </div>

      {/* Personal Bests & Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Rekordy Osobiste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {athlete.stats.personalBests.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-sport-accent rounded-lg">
                  <div>
                    <p className="font-medium">{record.distance}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{record.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Ostatnia Aktywność</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {athlete.recentActivity.map((activity, index) => (
                <div key={index} className="p-3 bg-sport-accent rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{activity.activity}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{activity.duration}</p>
                  {activity.notes && (
                    <p className="text-sm">{activity.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}