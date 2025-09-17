import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, Clock, Target } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets?: string;
  duration?: string;
  notes?: string;
}

interface TrainingInputDialogProps {
  children: React.ReactNode;
  athleteName?: string;
}

export function TrainingInputDialog({ children, athleteName }: TrainingInputDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState("");
  const [currentSets, setCurrentSets] = useState("");
  const [currentDuration, setCurrentDuration] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  const [trainingTime, setTrainingTime] = useState("");
  const [notes, setNotes] = useState("");

  const addExercise = () => {
    if (currentExercise.trim()) {
      const newExercise: Exercise = {
        id: Date.now().toString(),
        name: currentExercise,
        sets: currentSets,
        duration: currentDuration
      };
      setExercises([...exercises, newExercise]);
      setCurrentExercise("");
      setCurrentSets("");
      setCurrentDuration("");
    }
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleSave = () => {
    // Here you would save the training plan
    console.log("Saving training:", {
      athleteName,
      trainingType,
      trainingDate,
      trainingTime,
      exercises,
      notes
    });
    setIsOpen(false);
    // Reset form
    setExercises([]);
    setTrainingType("");
    setTrainingDate("");
    setTrainingTime("");
    setNotes("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dodaj Trening</DialogTitle>
          <DialogDescription>
            {athleteName ? `Utwórz nowy trening dla: ${athleteName}` : "Utwórz nowy plan treningowy"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="training-type">Typ treningu</Label>
              <Select value={trainingType} onValueChange={setTrainingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technika">Technika</SelectItem>
                  <SelectItem value="wytrzymalosc">Wytrzymałość</SelectItem>
                  <SelectItem value="sprint">Sprint</SelectItem>
                  <SelectItem value="sila">Siła</SelectItem>
                  <SelectItem value="regeneracja">Regeneracja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="training-date">Data</Label>
              <Input
                id="training-date"
                type="date"
                value={trainingDate}
                onChange={(e) => setTrainingDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="training-time">Godzina</Label>
              <Input
                id="training-time"
                type="time"
                value={trainingTime}
                onChange={(e) => setTrainingTime(e.target.value)}
              />
            </div>
          </div>

          {/* Exercise Input */}
          <div className="space-y-4">
            <h4 className="font-medium">Ćwiczenia</h4>
            
            <Card className="p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-1">
                    <Input
                      placeholder="Nazwa ćwiczenia"
                      value={currentExercise}
                      onChange={(e) => setCurrentExercise(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addExercise()}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Serie/powtórzenia"
                      value={currentSets}
                      onChange={(e) => setCurrentSets(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Czas (min)"
                      value={currentDuration}
                      onChange={(e) => setCurrentDuration(e.target.value)}
                    />
                    <Button onClick={addExercise} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Exercise List */}
            {exercises.length > 0 && (
              <div className="space-y-2">
                {exercises.map((exercise, index) => (
                  <Card key={exercise.id} className="p-3">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{index + 1}. {exercise.name}</span>
                          </div>
                          <div className="flex gap-3 text-sm text-muted-foreground">
                            {exercise.sets && (
                              <div className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                {exercise.sets}
                              </div>
                            )}
                            {exercise.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {exercise.duration} min
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeExercise(exercise.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Uwagi dla sportowca</Label>
            <Textarea
              id="notes"
              placeholder="Dodatkowe instrukcje, cele treningu, uwagi..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Anuluj
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-primary hover:bg-sport-hover text-primary-foreground"
            >
              Zapisz Trening
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}