import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, XCircle, Shield, Clock } from 'lucide-react';
import { ProctoringViolation } from '@/hooks/use-proctoring-monitor';

interface ViolationModalProps {
  isOpen: boolean;
  violation: ProctoringViolation | null;
  remainingWarnings: number;
  maxWarnings: number;
  isExamTerminated: boolean;
  onDismiss: () => void;
  onTerminateExam?: () => void;
}

export default function ViolationModal({
  isOpen,
  violation,
  remainingWarnings,
  maxWarnings,
  isExamTerminated,
  onDismiss,
  onTerminateExam
}: ViolationModalProps) {
  if (!violation) return null;

  const getSeverityColor = (severity: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getViolationIcon = (type: string) => {
    switch (type) {
      case 'tab_switch':
      case 'window_blur':
        return <XCircle className="h-6 w-6 text-destructive" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-warning" />;
    }
  };

  const getViolationTitle = (type: string) => {
    switch (type) {
      case 'tab_switch': return 'Tab Switch Detected';
      case 'window_blur': return 'Window Focus Lost';
      case 'right_click': return 'Context Menu Attempt';
      case 'key_combination': return 'Restricted Key Combination';
      default: return 'Proctoring Violation';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onDismiss}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            {getViolationIcon(violation.type)}
            {isExamTerminated ? 'Exam Terminated' : 'Proctoring Violation'}
          </DialogTitle>
          <DialogDescription>
            {isExamTerminated 
              ? 'Your exam has been terminated due to multiple violations.'
              : 'A proctoring violation has been detected during your exam.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Violation Details */}
          <div className="p-4 border rounded-lg bg-destructive/5 border-destructive/20">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-destructive">
                {getViolationTitle(violation.type)}
              </h4>
              <Badge variant={getSeverityColor(violation.severity)}>
                {violation.severity}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {violation.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {violation.timestamp.toLocaleTimeString()}
            </div>
          </div>

          {/* Warning Counter */}
          {!isExamTerminated && (
            <div className="p-3 border rounded-lg bg-warning/5 border-warning/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Warnings</span>
                <span className="text-sm">
                  {maxWarnings - remainingWarnings} / {maxWarnings}
                </span>
              </div>
              <div className="mt-2 w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((maxWarnings - remainingWarnings) / maxWarnings) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {remainingWarnings === 0 
                  ? 'Next violation will terminate your exam'
                  : `${remainingWarnings} warning${remainingWarnings === 1 ? '' : 's'} remaining`
                }
              </p>
            </div>
          )}

          {/* Guidelines */}
          <div className="p-3 border rounded-lg bg-muted/30">
            <h5 className="text-sm font-medium mb-2">Exam Guidelines</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Stay on the exam tab at all times</li>
              <li>• Do not use browser developer tools</li>
              <li>• Avoid switching between applications</li>
              <li>• Keep your face visible to the camera</li>
              <li>• Do not right-click or use context menus</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {isExamTerminated ? (
              <Button 
                onClick={onTerminateExam} 
                className="w-full"
                variant="destructive"
              >
                Exit Exam
              </Button>
            ) : (
              <>
                <Button 
                  onClick={onDismiss} 
                  className="flex-1"
                  variant="outline"
                >
                  I Understand
                </Button>
                <Button 
                  onClick={onDismiss}
                  className="flex-1"
                >
                  Continue Exam
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
