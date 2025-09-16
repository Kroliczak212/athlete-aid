import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sportTypes = [
  "Pływanie",
  "Triathlon", 
  "Bieganie",
  "Kolarstwo",
  "Siłownia",
  "Tenis",
  "Piłka nożna",
  "Koszykówka",
  "Inne"
];

export function AddAthleteDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    email: "",
    phone: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: "Sportowiec dodany",
      description: `${formData.name} został pomyślnie dodany do systemu.`,
    });
    setOpen(false);
    setFormData({ name: "", sport: "", email: "", phone: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-sport-hover text-primary-foreground shadow-sport">
          <Plus className="mr-2 h-4 w-4" />
          Dodaj Sportowca
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Dodaj nowego sportowca</DialogTitle>
          <DialogDescription>
            Wprowadź dane nowego podopiecznego do systemu zarządzania.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Imię i nazwisko</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Jan Kowalski"
              required
              className="border-input bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sport">Dyscyplina sportowa</Label>
            <Select 
              value={formData.sport} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, sport: value }))}
              required
            >
              <SelectTrigger className="border-input bg-background">
                <SelectValue placeholder="Wybierz sport" />
              </SelectTrigger>
              <SelectContent>
                {sportTypes.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="jan@example.com"
              className="border-input bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+48 123 456 789"
              className="border-input bg-background"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="border-border"
            >
              Anuluj
            </Button>
            <Button 
              type="submit"
              className="bg-primary hover:bg-sport-hover text-primary-foreground"
            >
              Dodaj Sportowca
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}