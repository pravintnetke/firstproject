import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ExamTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  onWarning?: (minutesLeft: number) => void;
}

export function ExamTimer({ duration, onTimeUp, onWarning }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        // Warning at 15 minutes
        if (newTime === 900 && onWarning) {
          onWarning(15);
          setIsWarning(true);
        }
        
        // Critical warning at 5 minutes
        if (newTime === 300) {
          setIsCritical(true);
          if (onWarning) onWarning(5);
        }
        
        // Time up
        if (newTime <= 0) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, onWarning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (isCritical) return 'text-red-600';
    if (isWarning) return 'text-orange-600';
    return 'text-primary';
  };

  const getTimerBg = () => {
    if (isCritical) return 'bg-red-50 border-red-200';
    if (isWarning) return 'bg-orange-50 border-orange-200';
    return 'bg-background';
  };

  return (
    <div className="space-y-4">
      <Card className={`${getTimerBg()} transition-colors duration-300`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${getTimerColor()}`} />
              <span className="font-medium">Time Remaining</span>
            </div>
            
            <Badge 
              variant={isCritical ? "destructive" : isWarning ? "secondary" : "default"}
              className={`text-lg font-mono px-3 py-1 ${getTimerColor()}`}
            >
              {formatTime(timeLeft)}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  isCritical ? 'bg-red-500' : isWarning ? 'bg-orange-500' : 'bg-primary'
                }`}
                style={{ 
                  width: `${(timeLeft / duration) * 100}%` 
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Alerts */}
      {isCritical && (
        <Alert className="border-red-200 bg-red-50 animate-pulse">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-medium">
            Critical: Only 5 minutes remaining! The exam will auto-submit when time expires.
          </AlertDescription>
        </Alert>
      )}
      
      {isWarning && !isCritical && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Warning: 15 minutes remaining. Please review your answers.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}