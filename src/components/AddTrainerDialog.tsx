import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus2 } from "lucide-react";

interface AddTrainerDialogProps {
  onAddTrainer?: (trainer: any) => void;
}

export function AddTrainerDialog({ onAddTrainer }: AddTrainerDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    qualifications: "",
    hourlyRate: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTrainer = {
      id: Date.now(),
      ...formData,
      athletes: [],
      weeklyHours: 0,
      rating: 5.0,
      avatar: "/placeholder.svg"
    };

    onAddTrainer?.(newTrainer);
    setOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialty: "",
      experience: "",
      qualifications: "",
      hourlyRate: "",
      notes: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus2 className="h-4 w-4 mr-2" />
          Dodaj Trenera
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dodaj Nowego Trenera</DialogTitle>
          <DialogDescription>
            Wprowadź dane nowego trenera do systemu klubu.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trainerName">Imię i nazwisko *</Label>
              <Input
                id="trainerName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Anna Kowalska"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trainerEmail">Email *</Label>
              <Input
                id="trainerEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="anna.kowalska@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trainerPhone">Telefon</Label>
              <Input
                id="trainerPhone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+48 123 456 789"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialty">Specjalizacja *</Label>
              <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz specjalizację" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="siatkówka">Siatkówka</SelectItem>
                  <SelectItem value="piłka nożna">Piłka nożna</SelectItem>
                  <SelectItem value="koszykówka">Koszykówka</SelectItem>
                  <SelectItem value="tenis">Tenis</SelectItem>
                  <SelectItem value="badminton">Badminton</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="sporty walki">Sporty walki</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Doświadczenie</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="np. 5 lat, 10 lat"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Stawka godzinowa (PLN)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                placeholder="150"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="qualifications">Kwalifikacje i certyfikaty</Label>
            <Textarea
              id="qualifications"
              value={formData.qualifications}
              onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
              placeholder="Lista posiadanych kwalifikacji, certyfikatów, kursów"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trainerNotes">Dodatkowe informacje</Label>
            <Textarea
              id="trainerNotes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Dodatkowe informacje o trenerze"
              rows={3}
            />
          </div>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Anuluj
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Dodaj Trenera
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}