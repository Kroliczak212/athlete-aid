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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const feedbackTypes = [
  "Pochwała",
  "Uwagi techniczne",
  "Motywacja",
  "Korekta planu",
  "Wskazówki żywieniowe",
  "Inne"
];

const ratingOptions = [
  { value: "5", label: "Doskonale (5/5)", color: "text-green-600" },
  { value: "4", label: "Bardzo dobrze (4/5)", color: "text-green-500" },
  { value: "3", label: "Dobrze (3/5)", color: "text-yellow-500" },
  { value: "2", label: "Poprawić (2/5)", color: "text-orange-500" },
  { value: "1", label: "Wymaga pracy (1/5)", color: "text-red-500" }
];

interface TrainerFeedbackDialogProps {
  athleteName: string;
  children?: React.ReactNode;
}

export function TrainerFeedbackDialog({ athleteName, children }: TrainerFeedbackDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    rating: "",
    feedback: "",
    privateNotes: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Uwagi wysłane",
      description: `Feedback dla ${athleteName} został pomyślnie przekazany.`,
    });
    setOpen(false);
    setFormData({ type: "", rating: "", feedback: "", privateNotes: "" });
  };

  const getRatingColor = (rating: string) => {
    const option = ratingOptions.find(opt => opt.value === rating);
    return option?.color || "text-muted-foreground";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="border-border hover:bg-sport-accent">
            <MessageSquare className="mr-2 h-4 w-4" />
            Wystawy uwagi
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Wystawy uwagi trenera</DialogTitle>
          <DialogDescription>
            Przekaż feedback i ocenę dla: <strong>{athleteName}</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedback-type">Typ uwag</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              required
            >
              <SelectTrigger className="border-input bg-background">
                <SelectValue placeholder="Wybierz typ uwag" />
              </SelectTrigger>
              <SelectContent>
                {feedbackTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="performance-rating">Ocena wykonania</Label>
            <Select 
              value={formData.rating} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
              required
            >
              <SelectTrigger className="border-input bg-background">
                <SelectValue placeholder="Oceń wykonanie treningu" />
              </SelectTrigger>
              <SelectContent>
                {ratingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Star className={`h-4 w-4 ${option.color}`} />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.rating && (
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-sport-accent">
                  <Star className={`h-3 w-3 mr-1 ${getRatingColor(formData.rating)}`} />
                  {ratingOptions.find(opt => opt.value === formData.rating)?.label}
                </Badge>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback-content">Uwagi dla sportowca</Label>
            <Textarea
              id="feedback-content"
              value={formData.feedback}
              onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
              placeholder="Napisz konstruktywny feedback, pochwały, wskazówki techniczne..."
              rows={4}
              required
              className="border-input bg-background resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Te uwagi zostaną przekazane sportowcowi
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="private-notes">Prywatne notatki trenera</Label>
            <Textarea
              id="private-notes"
              value={formData.privateNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, privateNotes: e.target.value }))}
              placeholder="Prywatne obserwacje, plan rozwoju, uwagi dla własnego użytku..."
              rows={3}
              className="border-input bg-background resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Te notatki są widoczne tylko dla trenera
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
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
              <Send className="mr-2 h-4 w-4" />
              Wyślij uwagi
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}