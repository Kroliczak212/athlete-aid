import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ChevronDown, 
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Star
} from "lucide-react";

// Mock data dla klubu
const mockClubStats = [
  { title: "Łączna liczba trenerów", value: "12", icon: Users, trend: "+2" },
  { title: "Aktywni sportowcy", value: "156", icon: UserCheck, trend: "+8" },
  { title: "Zajęcia w tym tygodniu", value: "89", icon: Calendar, trend: "+5" },
  { title: "Średnia ocena klubu", value: "4.8", icon: Star, trend: "+0.1" }
];

const mockTrainers = [
  {
    id: 1,
    name: "Anna Kowalska",
    specialty: "Siatkówka",
    experience: "8 lat",
    email: "anna.kowalska@klub.pl",
    phone: "+48 123 456 789",
    avatar: "/placeholder.svg",
    athletes: [
      { id: 1, name: "Maja Nowak", sessions: 12, nextSession: "2024-01-15", performance: "Dobra" },
      { id: 2, name: "Tomasz Wiśniewski", sessions: 8, nextSession: "2024-01-16", performance: "Bardzo dobra" },
      { id: 3, name: "Ola Kowalczyk", sessions: 15, nextSession: "2024-01-15", performance: "Średnia" }
    ],
    weeklyHours: 32,
    rating: 4.9
  },
  {
    id: 2,
    name: "Marek Nowicki",
    specialty: "Piłka nożna",
    experience: "12 lat",
    email: "marek.nowicki@klub.pl",
    phone: "+48 987 654 321",
    avatar: "/placeholder.svg",
    athletes: [
      { id: 4, name: "Jakub Zieliński", sessions: 10, nextSession: "2024-01-17", performance: "Dobra" },
      { id: 5, name: "Adam Wójcik", sessions: 6, nextSession: "2024-01-18", performance: "Bardzo dobra" }
    ],
    weeklyHours: 28,
    rating: 4.7
  },
  {
    id: 3,
    name: "Katarzyna Dąbrowska",
    specialty: "Koszykówka",
    experience: "6 lat",
    email: "katarzyna.dabrowska@klub.pl",
    phone: "+48 555 444 333",
    avatar: "/placeholder.svg",
    athletes: [
      { id: 6, name: "Natalia Król", sessions: 14, nextSession: "2024-01-16", performance: "Bardzo dobra" },
      { id: 7, name: "Paweł Mazur", sessions: 9, nextSession: "2024-01-19", performance: "Dobra" },
      { id: 8, name: "Julia Pawlak", sessions: 11, nextSession: "2024-01-17", performance: "Średnia" }
    ],
    weeklyHours: 35,
    rating: 4.8
  }
];

const mockClubAthletes = [
  { id: 9, name: "Michał Szymański", sport: "Tenis", level: "Średniozaawansowany", sessions: 20 },
  { id: 10, name: "Aleksandra Wojciechowska", sport: "Badminton", level: "Początkujący", sessions: 8 },
  { id: 11, name: "Robert Kaczmarek", sport: "Tenis stołowy", level: "Zaawansowany", sessions: 25 }
];

export default function ClubDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [expandedTrainers, setExpandedTrainers] = useState<number[]>([]);

  const toggleTrainer = (trainerId: number) => {
    setExpandedTrainers(prev => 
      prev.includes(trainerId) 
        ? prev.filter(id => id !== trainerId)
        : [...prev, trainerId]
    );
  };

  const filteredTrainers = mockTrainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === "all" || trainer.specialty.toLowerCase().includes(selectedSport.toLowerCase());
    return matchesSearch && matchesSport;
  });

  const allAthletes = [
    ...mockTrainers.flatMap(trainer => 
      trainer.athletes.map(athlete => ({ ...athlete, trainer: trainer.name, trainerSpecialty: trainer.specialty }))
    ),
    ...mockClubAthletes.map(athlete => ({ ...athlete, trainer: "Klub", trainerSpecialty: athlete.sport }))
  ];

  const getPerformanceBadgeVariant = (performance: string) => {
    switch (performance) {
      case "Bardzo dobra": return "default";
      case "Dobra": return "secondary";
      case "Średnia": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel Klubu</h1>
          <p className="text-muted-foreground">Zarządzaj trenerami i sportowcami swojego klubu</p>
        </div>
      </div>

      {/* Statystyki klubu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockClubStats.map((stat) => (
          <Card key={stat.title} className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-primary flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.trend} w tym miesiącu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtry */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Szukaj trenerów lub dyscyplin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-sm"
        />
        <Select value={selectedSport} onValueChange={setSelectedSport}>
          <SelectTrigger className="sm:w-[200px]">
            <SelectValue placeholder="Wszystkie dyscypliny" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie dyscypliny</SelectItem>
            <SelectItem value="siatkówka">Siatkówka</SelectItem>
            <SelectItem value="piłka nożna">Piłka nożna</SelectItem>
            <SelectItem value="koszykówka">Koszykówka</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Główna zawartość */}
      <Tabs defaultValue="trainers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trainers">Trenerzy</TabsTrigger>
          <TabsTrigger value="athletes">Wszyscy Sportowcy</TabsTrigger>
          <TabsTrigger value="club-athletes">Sportowcy Klubu</TabsTrigger>
        </TabsList>

        {/* Zakładka Trenerzy */}
        <TabsContent value="trainers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Trenerzy ({filteredTrainers.length})</h2>
          </div>
          
          <div className="space-y-4">
            {filteredTrainers.map((trainer) => (
              <Card key={trainer.id} className="border-primary/20">
                <Collapsible 
                  open={expandedTrainers.includes(trainer.id)}
                  onOpenChange={() => toggleTrainer(trainer.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={trainer.avatar} alt={trainer.name} />
                            <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{trainer.name}</CardTitle>
                            <CardDescription className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="secondary">{trainer.specialty}</Badge>
                              <Badge variant="outline">{trainer.experience}</Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                                {trainer.rating}
                              </div>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right hidden sm:block">
                            <div className="text-sm font-medium">{trainer.athletes.length} podopiecznych</div>
                            <div className="text-xs text-muted-foreground">{trainer.weeklyHours}h/tydzień</div>
                          </div>
                          {expandedTrainers.includes(trainer.id) ? 
                            <ChevronDown className="h-5 w-5" /> : 
                            <ChevronRight className="h-5 w-5" />
                          }
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Informacje kontaktowe */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">KONTAKT</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-4 w-4 text-primary" />
                              <span>{trainer.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-4 w-4 text-primary" />
                              <span>{trainer.phone}</span>
                            </div>
                          </div>
                        </div>

                        {/* Statystyki */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">STATYSTYKI</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <div className="font-medium">{trainer.athletes.length}</div>
                              <div className="text-xs text-muted-foreground">Podopieczni</div>
                            </div>
                            <div>
                              <div className="font-medium">{trainer.weeklyHours}h</div>
                              <div className="text-xs text-muted-foreground">Tygodniowo</div>
                            </div>
                          </div>
                        </div>

                        {/* Podopieczni */}
                        <div className="lg:col-span-1">
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">PODOPIECZNI</h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {trainer.athletes.map((athlete) => (
                              <div key={athlete.id} className="p-2 bg-accent/30 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">{athlete.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {athlete.sessions} sesji | Następna: {athlete.nextSession}
                                    </div>
                                  </div>
                                  <Badge 
                                    variant={getPerformanceBadgeVariant(athlete.performance)} 
                                    className="ml-2 text-xs"
                                  >
                                    {athlete.performance}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Zakładka Wszyscy Sportowcy */}
        <TabsContent value="athletes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Wszyscy Sportowcy ({allAthletes.length})</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAthletes.map((athlete) => (
              <Card key={`${athlete.id}-${athlete.trainer}`} className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{athlete.name}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="secondary">{athlete.trainerSpecialty}</Badge>
                      <Badge variant="outline">{athlete.trainer}</Badge>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{athlete.sessions || 0} sesji</span>
                    </div>
                    {'performance' in athlete && (
                      <Badge variant={getPerformanceBadgeVariant(athlete.performance)}>
                        {athlete.performance}
                      </Badge>
                    )}
                    {'level' in athlete && (
                      <Badge variant="secondary">{athlete.level}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Zakładka Sportowcy Klubu */}
        <TabsContent value="club-athletes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Sportowcy prowadzeni przez klub ({mockClubAthletes.length})</h2>
            <Button className="bg-primary hover:bg-primary/90">
              Dodaj sportowca
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockClubAthletes.map((athlete) => (
              <Card key={athlete.id} className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{athlete.name}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="secondary">{athlete.sport}</Badge>
                      <Badge variant="outline">{athlete.level}</Badge>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{athlete.sessions} sesji</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Szczegóły
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}