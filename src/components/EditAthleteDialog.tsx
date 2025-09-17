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
import { Edit, Save } from "lucide-react";
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

interface EditAthleteDialogProps {
  athlete: {
    id: string;
    name: string;
    sport: string;
    email?: string;
    phone?: string;
  };
  children?: React.ReactNode;
}

export function EditAthleteDialog({ athlete, children }: EditAthleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: athlete.name,
    sport: athlete.sport,
    email: athlete.email || "",
    phone: athlete.phone || "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Dane zaktualizowane",
      description: `Dane sportowca ${formData.name} zostały pomyślnie zaktualizowane.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="border-border hover:bg-sport-accent">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Edytuj dane sportowca</DialogTitle>
          <DialogDescription>
            Zaktualizuj informacje o podopiecznym.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Imię i nazwisko</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Jan Kowalski"
              required
              className="border-input bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-sport">Dyscyplina sportowa</Label>
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
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="jan@example.com"
              className="border-input bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-phone">Telefon</Label>
            <Input
              id="edit-phone"
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
              <Save className="mr-2 h-4 w-4" />
              Zapisz zmiany
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}