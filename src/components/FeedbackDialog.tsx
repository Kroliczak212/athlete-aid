import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface FeedbackDialogProps {
  children: React.ReactNode;
  athleteName?: string;
}

export function FeedbackDialog({ children, athleteName }: FeedbackDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');

  const handleSend = () => {
    // Here you would send the feedback
    console.log('Sending feedback:', {
      athleteName,
      feedbackType,
      message,
      priority,
    });
    setIsOpen(false);
    // Reset form
    setFeedbackType('');
    setMessage('');
    setPriority('normal');
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'correction':
        return <AlertCircle className="h-4 w-4 text-sport-warning" />;
      case 'praise':
        return <CheckCircle className="h-4 w-4 text-sport-success" />;
      case 'instruction':
        return <Info className="h-4 w-4 text-primary" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'normal':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Wyślij Uwagi
          </DialogTitle>
          <DialogDescription>
            {athleteName ? `Przekaż uwagi dla: ${athleteName}` : 'Wyślij uwagi do sportowca'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Feedback Type */}
          <div className="space-y-2">
            <Label htmlFor="feedback-type">Typ uwagi</Label>
            <Select value={feedbackType} onValueChange={setFeedbackType}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz typ uwagi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="praise">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-sport-success" />
                    Pochwała
                  </div>
                </SelectItem>
                <SelectItem value="correction">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-sport-warning" />
                    Korekta
                  </div>
                </SelectItem>
                <SelectItem value="instruction">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Instrukcja
                  </div>
                </SelectItem>
                <SelectItem value="general">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Ogólna uwaga
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priorytet</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Niski</SelectItem>
                <SelectItem value="normal">Normalny</SelectItem>
                <SelectItem value="high">Wysoki</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Wiadomość</Label>
            <Textarea
              id="message"
              placeholder="Wpisz swoją uwagę..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* Preview */}
          {(feedbackType || message) && (
            <div className="p-3 bg-sport-accent rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                {getFeedbackIcon(feedbackType)}
                <span className="font-medium text-sm">Podgląd uwagi</span>
                <Badge variant={getPriorityColor(priority) as any} className="text-xs">
                  {priority === 'high' ? 'Wysoki' : priority === 'low' ? 'Niski' : 'Normalny'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{message || 'Treść uwagi...'}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Anuluj
            </Button>
            <Button
              onClick={handleSend}
              disabled={!feedbackType || !message.trim()}
              className="bg-primary hover:bg-sport-hover text-primary-foreground"
            >
              Wyślij Uwagi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
