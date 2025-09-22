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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Settings, Save, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

const trainingTypes = [
  "Technika",
  "Wytrzymałość",
  "Siła", 
  "Szybkość",
  "Interwały",
  "Regeneracja",
  "Test wydolnościowy",
  "Inne"
];

const intensityLevels = [
  "Bardzo niska (1-2)",
  "Niska (3-4)",
  "Średnia (5-6)",
  "Wysoka (7-8)",
  "Bardzo wysoka (9-10)"
];

interface TrainingConfigDialogProps {
  athleteName: string;
  children?: React.ReactNode;
}

export function TrainingConfigDialog({ athleteName, children }: TrainingConfigDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [exercises, setExercises] = useState([{ name: "", duration: "", notes: "" }]);
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    intensity: "",
    notes: "",
    time: "",
  });
  const { toast } = useToast();

  const addExercise = () => {
    setExercises([...exercises, { name: "", duration: "", notes: "" }]);
  };

  const removeExercise = (index: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const updateExercise = (index: number, field: string, value: string) => {
    const updated = exercises.map((exercise, i) => 
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Trening skonfigurowany",
      description: `Plan treningowy dla ${athleteName} został pomyślnie utworzony.`,
    });
    setOpen(false);
    setFormData({ type: "", duration: "", intensity: "", notes: "", time: "" });
    setExercises([{ name: "", duration: "", notes: "" }]);
    setDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-primary hover:bg-sport-hover text-primary-foreground">
            <Settings className="mr-2 h-4 w-4" />
            Konfiguruj trening
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle>Konfiguracja treningu</DialogTitle>
          <DialogDescription>
            Ustaw plan treningowy dla: <strong>{athleteName}</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data treningu</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-input bg-background"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: pl }) : "Wybierz datę"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="training-time">Godzina</Label>
              <Input
                id="training-time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="border-input bg-background"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="training-type">Typ treningu</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                required
              >
                <SelectTrigger className="border-input bg-background">
                  <SelectValue placeholder="Wybierz typ" />
                </SelectTrigger>
                <SelectContent>
                  {trainingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="training-duration">Czas trwania (min)</Label>
              <Input
                id="training-duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="90"
                min="1"
                className="border-input bg-background"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="training-intensity">Intensywność</Label>
            <Select 
              value={formData.intensity} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, intensity: value }))}
              required
            >
              <SelectTrigger className="border-input bg-background">
                <SelectValue placeholder="Wybierz intensywność" />
              </SelectTrigger>
              <SelectContent>
                {intensityLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Ćwiczenia</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addExercise}
                className="border-border"
              >
                <Plus className="h-4 w-4 mr-1" />
                Dodaj ćwiczenie
              </Button>
            </div>

            {exercises.map((exercise, index) => (
              <div key={index} className="p-3 border border-border rounded-lg bg-sport-accent space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Ćwiczenie {index + 1}</span>
                  {exercises.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExercise(index)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Nazwa ćwiczenia</Label>
                    <Input
                      value={exercise.name}
                      onChange={(e) => updateExercise(index, "name", e.target.value)}
                      placeholder="np. 4x100m kraul"
                      className="border-input bg-background"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Czas/Dystans</Label>
                    <Input
                      value={exercise.duration}
                      onChange={(e) => updateExercise(index, "duration", e.target.value)}
                      placeholder="np. 20 min lub 400m"
                      className="border-input bg-background"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs">Opis trenera</Label>
                  <Textarea
                    value={exercise.notes}
                    onChange={(e) => updateExercise(index, "notes", e.target.value)}
                    placeholder="Szczegółowy opis ćwiczenia, technika wykonania, cele..."
                    rows={3}
                    className="border-input bg-background resize-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="training-notes">Ogólne uwagi do treningu</Label>
            <Textarea
              id="training-notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Dodatkowe wskazówki, cele treningu..."
              rows={3}
              className="border-input bg-background resize-none"
            />
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
              <Save className="mr-2 h-4 w-4" />
              Zapisz trening
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}