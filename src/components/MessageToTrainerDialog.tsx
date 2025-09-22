import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const messageTypes = [
  'Pytanie ogólne',
  'Problem z treningiem',
  'Zmiana terminu',
  'Kontuzja/dolegliwość',
  'Prośba o feedback',
  'Inne',
];

interface MessageToTrainerDialogProps {
  children?: React.ReactNode;
}

export function MessageToTrainerDialog({ children }: MessageToTrainerDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    type: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Wiadomość wysłana',
      description: 'Twoja wiadomość została przekazana do trenera. Otrzymasz odpowiedź wkrótce.',
    });
    setOpen(false);
    setFormData({ subject: '', type: '', message: '' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="border-border hover:bg-sport-accent">
            <MessageSquare className="mr-2 h-4 w-4" />
            Kontakt z trenerem
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Wyślij wiadomość do trenera</DialogTitle>
          <DialogDescription>
            Skontaktuj się ze swoim trenerem w sprawie treningów, pytań lub uwag.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message-subject">Temat</Label>
            <Input
              id="message-subject"
              value={formData.subject}
              onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
              placeholder="Krótki opis tematu..."
              required
              className="border-input bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-type">Typ wiadomości</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              required
            >
              <SelectTrigger className="border-input bg-background">
                <SelectValue placeholder="Wybierz typ wiadomości" />
              </SelectTrigger>
              <SelectContent>
                {messageTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-content">Wiadomość</Label>
            <Textarea
              id="message-content"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Opisz szczegółowo swoją wiadomość..."
              rows={5}
              required
              className="border-input bg-background resize-none"
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
              <Send className="mr-2 h-4 w-4" />
              Wyślij wiadomość
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
