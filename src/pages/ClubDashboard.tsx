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
  Star,
  CreditCard,
  AlertCircle,
  DollarSign,
  FileText,
  BarChart3
} from "lucide-react";
import { AddAthleteDialog } from "@/components/AddAthleteDialog";
import { AddTrainerDialog } from "@/components/AddTrainerDialog";

// Enhanced mock data with payment information
const mockClubStats = [
  { title: "Łączna liczba trenerów", value: "12", icon: Users, trend: "+2" },
  { title: "Aktywni sportowcy", value: "156", icon: UserCheck, trend: "+8" },
  { title: "Przychody tego miesiąca", value: "24,500 PLN", icon: DollarSign, trend: "+12%" },
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
    hourlyRate: 150,
    monthlyEarnings: 4500,
    athletes: [
      { 
        id: 1, 
        name: "Maja Nowak", 
        sessions: 12, 
        nextSession: "2024-01-15", 
        performance: "Dobra",
        monthlyPayment: 480,
        paid: true,
        hoursThisMonth: 8
      },
      { 
        id: 2, 
        name: "Tomasz Wiśniewski", 
        sessions: 8, 
        nextSession: "2024-01-16", 
        performance: "Bardzo dobra",
        monthlyPayment: 720,
        paid: false,
        hoursThisMonth: 12
      },
      { 
        id: 3, 
        name: "Ola Kowalczyk", 
        sessions: 15, 
        nextSession: "2024-01-15", 
        performance: "Średnia",
        monthlyPayment: 600,
        paid: true,
        hoursThisMonth: 10
      }
    ],
    weeklyHours: 32,
    rating: 4.9,
    trainingPlans: [
      { id: 1, name: "Plan siatkarski podstawowy", athletes: 8 },
      { id: 2, name: "Plan zaawansowany", athletes: 4 }
    ]
  },
  {
    id: 2,
    name: "Marek Nowicki",
    specialty: "Piłka nożna",
    experience: "12 lat",
    email: "marek.nowicki@klub.pl",
    phone: "+48 987 654 321",
    avatar: "/placeholder.svg",
    hourlyRate: 180,
    monthlyEarnings: 5400,
    athletes: [
      { 
        id: 4, 
        name: "Jakub Zieliński", 
        sessions: 10, 
        nextSession: "2024-01-17", 
        performance: "Dobra",
        monthlyPayment: 900,
        paid: true,
        hoursThisMonth: 15
      },
      { 
        id: 5, 
        name: "Adam Wójcik", 
        sessions: 6, 
        nextSession: "2024-01-18", 
        performance: "Bardzo dobra",
        monthlyPayment: 540,
        paid: false,
        hoursThisMonth: 9
      }
    ],
    weeklyHours: 28,
    rating: 4.7,
    trainingPlans: [
      { id: 3, name: "Technika piłkarska", athletes: 6 },
      { id: 4, name: "Kondycja dla piłkarzy", athletes: 3 }
    ]
  },
  {
    id: 3,
    name: "Katarzyna Dąbrowska",
    specialty: "Koszykówka",
    experience: "6 lat",
    email: "katarzyna.dabrowska@klub.pl",
    phone: "+48 555 444 333",
    avatar: "/placeholder.svg",
    hourlyRate: 140,
    monthlyEarnings: 4200,
    athletes: [
      { 
        id: 6, 
        name: "Natalia Król", 
        sessions: 14, 
        nextSession: "2024-01-16", 
        performance: "Bardzo dobra",
        monthlyPayment: 700,
        paid: true,
        hoursThisMonth: 14
      },
      { 
        id: 7, 
        name: "Paweł Mazur", 
        sessions: 9, 
        nextSession: "2024-01-19", 
        performance: "Dobra",
        monthlyPayment: 450,
        paid: true,
        hoursThisMonth: 9
      },
      { 
        id: 8, 
        name: "Julia Pawlak", 
        sessions: 11, 
        nextSession: "2024-01-17", 
        performance: "Średnia",
        monthlyPayment: 550,
        paid: false,
        hoursThisMonth: 11
      }
    ],
    weeklyHours: 35,
    rating: 4.8,
    trainingPlans: [
      { id: 5, name: "Koszykówka dla młodzieży", athletes: 7 },
      { id: 6, name: "Drużynowa koszykówka", athletes: 5 }
    ]
  }
];

const mockClubAthletes = [
  { 
    id: 9, 
    name: "Michał Szymański", 
    sport: "Tenis", 
    level: "Średniozaawansowany", 
    sessions: 20,
    monthlyPayment: 800,
    paid: true,
    hoursThisMonth: 16
  },
  { 
    id: 10, 
    name: "Aleksandra Wojciechowska", 
    sport: "Badminton", 
    level: "Początkujący", 
    sessions: 8,
    monthlyPayment: 320,
    paid: false,
    hoursThisMonth: 8
  },
  { 
    id: 11, 
    name: "Robert Kaczmarek", 
    sport: "Tenis stołowy", 
    level: "Zaawansowany", 
    sessions: 25,
    monthlyPayment: 1000,
    paid: true,
    hoursThisMonth: 20
  }
];

export default function ClubDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
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
      trainer.athletes.map(athlete => ({ 
        ...athlete, 
        trainer: trainer.name, 
        trainerSpecialty: trainer.specialty,
        trainerRate: trainer.hourlyRate
      }))
    ),
    ...mockClubAthletes.map(athlete => ({ 
      ...athlete, 
      trainer: "Klub", 
      trainerSpecialty: athlete.sport,
      trainerRate: 50
    }))
  ];

  const filteredAthletes = allAthletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayment = paymentFilter === "all" || 
                          (paymentFilter === "paid" && athlete.paid) ||
                          (paymentFilter === "unpaid" && !athlete.paid);
    return matchesSearch && matchesPayment;
  });

  const getPerformanceBadgeVariant = (performance: string) => {
    switch (performance) {
      case "Bardzo dobra": return "default";
      case "Dobra": return "secondary";
      case "Średnia": return "outline";
      default: return "outline";
    }
  };

  const getPaymentStatus = (paid: boolean) => ({
    variant: paid ? "default" : "destructive",
    text: paid ? "Opłacone" : "Zaległości"
  });

  // Statistics calculations
  const totalUnpaidAthletes = allAthletes.filter(a => !a.paid).length;
  const totalMonthlyRevenue = allAthletes.reduce((sum, a) => sum + (a.monthlyPayment || 0), 0);
  const totalPaidRevenue = allAthletes.filter(a => a.paid).reduce((sum, a) => sum + (a.monthlyPayment || 0), 0);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel Klubu</h1>
          <p className="text-muted-foreground">Kompleksowe zarządzanie klubem sportowym</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AddTrainerDialog />
          <AddAthleteDialog />
        </div>
      </div>

      {/* Enhanced Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockClubStats.map((stat) => (
          <Card key={stat.title} className="border-primary/20 hover:shadow-lg transition-shadow">
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

      {/* Financial Overview */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Przegląd Finansowy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Łączne przychody</p>
              <p className="text-2xl font-bold text-primary">{totalMonthlyRevenue.toLocaleString()} PLN</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Otrzymane płatności</p>
              <p className="text-2xl font-bold text-green-600">{totalPaidRevenue.toLocaleString()} PLN</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Zaległości</p>
              <p className="text-2xl font-bold text-destructive">{(totalMonthlyRevenue - totalPaidRevenue).toLocaleString()} PLN</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Osoby z zaległościami</p>
              <p className="text-2xl font-bold text-orange-500">{totalUnpaidAthletes}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Szukaj trenerów, sportowców..."
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
        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="sm:w-[200px]">
            <SelectValue placeholder="Status płatności" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie płatności</SelectItem>
            <SelectItem value="paid">Opłacone</SelectItem>
            <SelectItem value="unpaid">Zaległości</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content with Enhanced Tabs */}
      <Tabs defaultValue="trainers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trainers">Trenerzy</TabsTrigger>
          <TabsTrigger value="athletes">Wszyscy Sportowcy</TabsTrigger>
          <TabsTrigger value="club-athletes">Sportowcy Klubu</TabsTrigger>
          <TabsTrigger value="payments">Płatności</TabsTrigger>
        </TabsList>

        {/* Enhanced Trainers Tab */}
        <TabsContent value="trainers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Trenerzy ({filteredTrainers.length})</h2>
          </div>
          
          <div className="space-y-4">
            {filteredTrainers.map((trainer) => (
              <Card key={trainer.id} className="border-primary/20 hover:shadow-lg transition-shadow">
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
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                {trainer.hourlyRate} PLN/h
                              </Badge>
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
                            <div className="text-xs text-muted-foreground">{trainer.monthlyEarnings} PLN/miesiąc</div>
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
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Contact Information */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">KONTAKT</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-4 w-4 text-primary" />
                              <span className="break-all">{trainer.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-4 w-4 text-primary" />
                              <span>{trainer.phone}</span>
                            </div>
                          </div>
                        </div>

                        {/* Statistics */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">STATYSTYKI</h4>
                          <div className="grid grid-cols-1 gap-2 text-sm">
                            <div>
                              <div className="font-medium">{trainer.athletes.length}</div>
                              <div className="text-xs text-muted-foreground">Podopieczni</div>
                            </div>
                            <div>
                              <div className="font-medium">{trainer.monthlyEarnings} PLN</div>
                              <div className="text-xs text-muted-foreground">Miesięczny przychód</div>
                            </div>
                          </div>
                        </div>

                        {/* Training Plans */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">PLANY TRENINGOWE</h4>
                          <div className="space-y-1">
                            {trainer.trainingPlans?.map((plan) => (
                              <div key={plan.id} className="text-sm p-2 bg-accent/30 rounded">
                                <div className="font-medium">{plan.name}</div>
                                <div className="text-xs text-muted-foreground">{plan.athletes} sportowców</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Athletes with Payment Info */}
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">PODOPIECZNI</h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {trainer.athletes.map((athlete) => (
                              <div key={athlete.id} className="p-2 bg-accent/30 rounded-lg">
                                <div className="flex justify-between items-start mb-1">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">{athlete.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {athlete.hoursThisMonth}h w miesiącu | {athlete.monthlyPayment} PLN
                                    </div>
                                  </div>
                                  <Badge 
                                    variant={getPaymentStatus(athlete.paid).variant as "default" | "destructive"}
                                    className="ml-1 text-xs"
                                  >
                                    {getPaymentStatus(athlete.paid).text}
                                  </Badge>
                                </div>
                                <Badge 
                                  variant={getPerformanceBadgeVariant(athlete.performance)} 
                                  className="text-xs"
                                >
                                  {athlete.performance}
                                </Badge>
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

        {/* Enhanced Athletes Tab */}
        <TabsContent value="athletes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Wszyscy Sportowcy ({filteredAthletes.length})</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAthletes.map((athlete) => (
              <Card key={`${athlete.id}-${athlete.trainer}`} className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{athlete.name}</CardTitle>
                      <CardDescription>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="secondary">{athlete.trainerSpecialty}</Badge>
                          <Badge variant="outline">{athlete.trainer}</Badge>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={getPaymentStatus(athlete.paid).variant as "default" | "destructive"}
                      className="ml-2"
                    >
                      {getPaymentStatus(athlete.paid).text}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{athlete.hoursThisMonth || 0}h w miesiącu</span>
                      </div>
                      <div className="font-medium">{athlete.monthlyPayment || 0} PLN</div>
                    </div>
                    {'performance' in athlete && (
                      <Badge variant={getPerformanceBadgeVariant(athlete.performance)} className="text-xs">
                        {athlete.performance}
                      </Badge>
                    )}
                    {'level' in athlete && (
                      <Badge variant="secondary" className="text-xs">{athlete.level}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Club Athletes Tab */}
        <TabsContent value="club-athletes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Sportowcy prowadzeni przez klub ({mockClubAthletes.length})</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockClubAthletes.map((athlete) => (
              <Card key={athlete.id} className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{athlete.name}</CardTitle>
                      <CardDescription>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="secondary">{athlete.sport}</Badge>
                          <Badge variant="outline">{athlete.level}</Badge>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={getPaymentStatus(athlete.paid).variant as "default" | "destructive"}
                      className="ml-2"
                    >
                      {getPaymentStatus(athlete.paid).text}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{athlete.hoursThisMonth}h w miesiącu</span>
                      </div>
                      <div className="font-medium">{athlete.monthlyPayment} PLN</div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Szczegóły
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* New Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Zarządzanie Płatnościami</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <FileText className="h-4 w-4 mr-2" />
              Generuj Raport
            </Button>
          </div>

          {/* Payment Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Opłacone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{totalPaidRevenue.toLocaleString()} PLN</div>
                <div className="text-sm text-green-700">{allAthletes.filter(a => a.paid).length} sportowców</div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Zaległości
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{(totalMonthlyRevenue - totalPaidRevenue).toLocaleString()} PLN</div>
                <div className="text-sm text-red-700">{totalUnpaidAthletes} sportowców</div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Łącznie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{totalMonthlyRevenue.toLocaleString()} PLN</div>
                <div className="text-sm text-blue-700">{allAthletes.length} sportowców</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Payment List */}
          <Card>
            <CardHeader>
              <CardTitle>Szczegółowa lista płatności</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allAthletes.map((athlete) => (
                  <div key={`payment-${athlete.id}-${athlete.trainer}`} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="font-medium">{athlete.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {athlete.trainer} • {athlete.trainerSpecialty} • {athlete.hoursThisMonth || 0}h
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-medium">{athlete.monthlyPayment || 0} PLN</div>
                        <div className="text-sm text-muted-foreground">
                          {(athlete.trainerRate || 50)} PLN/h
                        </div>
                      </div>
                      <Badge 
                        variant={getPaymentStatus(athlete.paid).variant as "default" | "destructive"}
                        className="w-20 justify-center"
                      >
                        {getPaymentStatus(athlete.paid).text}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {athlete.paid ? "Szczegóły" : "Oznacz jako opłacone"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}