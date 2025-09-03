import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  Eye, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Camera,
  Mic,
  Shield,
  AlertTriangle,
  CheckCircle,
  Send
} from 'lucide-react';
import { sampleExams, sampleQuestions } from '@/data/sampleData';

interface ExamInterfaceProps {
  examId: string;
}

export default function ExamInterface({ examId }: ExamInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proctoringStatus, setProctoringStatus] = useState({
    camera: true,
    microphone: true,
    screenRecording: true,
    faceDetected: true
  });

  // Get exam data (in real app, fetch from API)
  const exam = sampleExams[0]; // Using first exam as example
  const questions = exam.questions;
  const currentQuestion = questions[currentQuestionIndex];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate proctoring status changes
  useEffect(() => {
    const proctoringTimer = setInterval(() => {
      setProctoringStatus(prev => ({
        ...prev,
        faceDetected: Math.random() > 0.1 // 90% chance face is detected
      }));
    }, 5000);

    return () => clearInterval(proctoringTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id);
      } else {
        newSet.add(currentQuestion.id);
      }
      return newSet;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      alert('Exam submitted successfully!');
      setIsSubmitting(false);
    }, 2000);
  };

  const getQuestionStatus = (questionId: string, index: number) => {
    const isAnswered = answers[questionId] !== undefined;
    const isFlagged = flaggedQuestions.has(questionId);
    const isCurrent = index === currentQuestionIndex;
    
    if (isCurrent) return 'current';
    if (isFlagged) return 'flagged';
    if (isAnswered) return 'answered';
    return 'not-answered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-primary text-primary-foreground';
      case 'answered': return 'bg-success text-success-foreground';
      case 'flagged': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="exam-interface">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{exam.title}</h1>
            <Badge variant="outline">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Proctoring Status */}
            <div className="flex items-center gap-2">
              <Camera className={`h-4 w-4 ${proctoringStatus.camera ? 'text-success' : 'text-destructive'}`} />
              <Mic className={`h-4 w-4 ${proctoringStatus.microphone ? 'text-success' : 'text-destructive'}`} />
              <Shield className={`h-4 w-4 ${proctoringStatus.screenRecording ? 'text-success' : 'text-destructive'}`} />
            </div>
            
            {/* Timer */}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-destructive' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            {/* Submit Button */}
            <Button 
              onClick={handleSubmitExam}
              disabled={isSubmitting}
              variant="destructive"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Exam'}
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <Progress 
            value={(currentQuestionIndex + 1) / questions.length * 100} 
            className="h-2"
          />
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Question Panel */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Question {currentQuestionIndex + 1}
                  {flaggedQuestions.has(currentQuestion.id) && (
                    <Flag className="h-4 w-4 text-warning fill-current" />
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{currentQuestion.difficulty}</Badge>
                  <Badge variant="secondary">{currentQuestion.marks} marks</Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Question Text */}
              <div className="text-lg leading-relaxed">
                {currentQuestion.text}
              </div>
              
              {/* Answer Options */}
              <div className="space-y-4">
                {currentQuestion.type === 'mcq' && currentQuestion.options && (
                  <RadioGroup
                    value={answers[currentQuestion.id]?.toString() || ''}
                    onValueChange={(value) => handleAnswerChange(parseInt(value))}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                
                {currentQuestion.type === 'true-false' && currentQuestion.options && (
                  <RadioGroup
                    value={answers[currentQuestion.id]?.toString() || ''}
                    onValueChange={(value) => handleAnswerChange(parseInt(value))}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                        <RadioGroupItem value={index.toString()} id={`tf-${index}`} />
                        <Label htmlFor={`tf-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                
                {currentQuestion.type === 'subjective' && (
                  <Textarea
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion.id]?.toString() || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="min-h-[200px]"
                  />
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleFlagQuestion}
                    className={flaggedQuestions.has(currentQuestion.id) ? 'bg-warning/10 border-warning' : ''}
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    {flaggedQuestions.has(currentQuestion.id) ? 'Unflag' : 'Flag for Review'}
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Palette */}
        <div className="w-80 border-l bg-muted/30 p-4 overflow-y-auto">
          {/* Proctoring Status */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Proctoring Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Face Detection</span>
                {proctoringStatus.faceDetected ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Screen Recording</span>
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Audio Monitoring</span>
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              
              {!proctoringStatus.faceDetected && (
                <div className="mt-2 p-2 bg-destructive/10 rounded text-xs text-destructive">
                  Face not detected. Please ensure you are visible to the camera.
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Question Palette */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Question Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => {
                  const status = getQuestionStatus(question.id, index);
                  return (
                    <button
                      key={question.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`
                        w-10 h-10 rounded text-sm font-medium transition-colors
                        ${getStatusColor(status)}
                        hover:opacity-80
                      `}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-success rounded" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-warning rounded" />
                  <span>Flagged</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded" />
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded" />
                  <span>Not Attempted</span>
                </div>
              </div>
              
              {/* Summary */}
              <div className="mt-4 pt-3 border-t space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Answered:</span>
                  <span>{Object.keys(answers).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Flagged:</span>
                  <span>{flaggedQuestions.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span>{questions.length - Object.keys(answers).length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}