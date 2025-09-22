import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { AthleteCard } from "@/components/AthleteCard";
import { AddAthleteDialog } from "@/components/AddAthleteDialog";
import { TrainingInputDialog } from "@/components/TrainingInputDialog";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import { Users, TrendingUp, Calendar, DollarSign, Search, Filter, Plus, MessageSquare } from "lucide-react";

// Mock data
const mockAthletes = [
  {
    id: "1",
    name: "Anna Kowalska",
    sport: "Pływanie",
    nextSession: "15.09.2024 18:00",
    paid: true,
    lastAttendance: true,
    initials: "AK"
  },
  {
    id: "2", 
    name: "Tomasz Nowak",
    sport: "Triathlon",
    nextSession: "16.09.2024 17:00",
    paid: false,
    lastAttendance: true,
    initials: "TN"
  },
  {
    id: "3",
    name: "Maria Wiśniewska", 
    sport: "Bieganie",
    nextSession: "17.09.2024 19:00",
    paid: true,
    lastAttendance: false,
    initials: "MW"
  },
  {
    id: "4",
    name: "Piotr Zieliński",
    sport: "Kolarstwo", 
    nextSession: "18.09.2024 16:00",
    paid: true,
    lastAttendance: true,
    initials: "PZ"
  }
];

const mockStats = [
  { title: "Wszyscy Sportowcy", value: "24", icon: Users, trend: "+2 w tym miesiącu" },
  { title: "Dzisiaj Trenują", value: "8", icon: Calendar, trend: "5 sesji zaplanowanych" },
  { title: "Opłacone", value: "87%", icon: DollarSign, trend: "+5% vs poprzedni miesiąc" },
  { title: "Obecność", value: "92%", icon: TrendingUp, trend: "Średnia z ostatnich 30 dni" },
];

export default function CRMDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  
  const filteredAthletes = mockAthletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !sportFilter || sportFilter === "all" || athlete.sport === sportFilter;
    return matchesSearch && matchesSport;
  });

  const uniqueSports = [...new Set(mockAthletes.map(a => a.sport))];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">CRM Sportowców</h1>
          <p className="text-muted-foreground">
            Zarządzaj podopiecznymi, sesjami i płatnościami
          </p>
        </div>
        <AddAthleteDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat, index) => (
          <Card key={index} className="border-border bg-card hover:shadow-card transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtry i Wyszukiwanie
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Szukaj sportowców..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-input bg-background"
            />
          </div>
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="w-full sm:w-48 border-input bg-background">
              <SelectValue placeholder="Filtruj po sporcie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie sporty</SelectItem>
              {uniqueSports.map((sport) => (
                <SelectItem key={sport} value={sport}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Szybkie Akcje - Trener</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <TrainingInputDialog>
              <Button className="w-full bg-primary hover:bg-sport-hover text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Dodaj Nowy Trening
              </Button>
            </TrainingInputDialog>
            <FeedbackDialog>
              <Button variant="outline" className="w-full border-border hover:bg-sport-accent">
                <MessageSquare className="mr-2 h-4 w-4" />
                Wyślij Uwagi Sportowcowi
              </Button>
            </FeedbackDialog>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Statystyki Treningów</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dzisiaj zaplanowane:</span>
              <span className="font-medium">8 sesji</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ten tydzień:</span>
              <span className="font-medium">24 treningi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Średnia obecność:</span>
              <span className="font-medium text-sport-success">92%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Athletes Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">
            Podopieczni ({filteredAthletes.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-sport-accent">
              {mockAthletes.filter(a => a.paid).length} opłaconych
            </Badge>
            <Badge variant="secondary" className="bg-sport-accent">
              {mockAthletes.filter(a => a.lastAttendance).length} obecnych ostatnio
            </Badge>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAthletes.map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>
        
        {filteredAthletes.length === 0 && (
          <Card className="border-border bg-card">
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                Nie znaleziono sportowców spełniających kryteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}