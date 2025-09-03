import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Target, 
  Download,
  Award,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { sampleExams, sampleQuestions } from '@/data/sampleData';
import { ExamResult } from '@/data/sampleData';

interface ResultDetailModalProps {
  result: ExamResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ResultDetailModal({ result, open, onOpenChange }: ResultDetailModalProps) {
  if (!result) return null;

  const exam = sampleExams.find(e => e.id === result.examId);
  const questions = sampleQuestions;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getGradeFromPercentage = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'bg-success' };
    if (percentage >= 80) return { grade: 'A', color: 'bg-success' };
    if (percentage >= 70) return { grade: 'B+', color: 'bg-warning' };
    if (percentage >= 60) return { grade: 'B', color: 'bg-warning' };
    if (percentage >= 50) return { grade: 'C', color: 'bg-destructive' };
    return { grade: 'F', color: 'bg-destructive' };
  };

  const { grade, color } = getGradeFromPercentage(result.percentage);

  const exportResult = (format: 'pdf' | 'csv') => {
    console.log(`Exporting result as ${format}`);
    // Implementation would generate and download the result
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detailed Result Analysis</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => exportResult('pdf')}>
                <Download className="mr-1 h-3 w-3" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportResult('csv')}>
                <Download className="mr-1 h-3 w-3" />
                CSV
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            {exam?.title} - Submitted on {format(new Date(result.submittedAt), 'PPP')}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Question Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <Badge className={`${color} text-white text-3xl px-6 py-3`}>
                      {grade}
                    </Badge>
                  </div>
                  <CardTitle className={`text-4xl font-bold ${getScoreColor(result.percentage)}`}>
                    {result.percentage}%
                  </CardTitle>
                  <CardDescription>
                    {result.score} out of {result.totalMarks} marks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={result.percentage} className="h-3 mb-4" />
                  <div className="text-center">
                    <Badge 
                      variant={result.status === 'passed' ? 'default' : 'destructive'}
                      className={result.status === 'passed' ? 'bg-success text-white' : ''}
                    >
                      {result.status === 'passed' ? 'PASSED' : 'FAILED'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {/* Exam Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Exam Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subject:</span>
                      <span className="font-medium">{exam?.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{exam?.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Questions:</span>
                      <span className="font-medium">{questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passing Marks:</span>
                      <span className="font-medium">{exam?.passingMarks}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Time Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Taken:</span>
                      <span className="font-medium">{result.timeTaken} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Remaining:</span>
                      <span className="font-medium">{(exam?.duration || 0) - result.timeTaken} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg per Question:</span>
                      <span className="font-medium">{Math.round(result.timeTaken / questions.length)} minutes</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Question-wise Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of your answers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = result.answers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">Q{index + 1}.</span>
                            <Badge variant="outline">{question.marks} marks</Badge>
                            <Badge variant="outline" className="capitalize">
                              {question.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm mb-3">{question.text}</p>
                          
                          {question.type === 'mcq' && question.options && (
                            <div className="space-y-2 text-sm">
                              {question.options.map((option, optIndex) => (
                                <div 
                                  key={optIndex}
                                  className={`p-2 rounded ${
                                    optIndex === question.correctAnswer ? 'bg-success/10 border border-success' :
                                    optIndex === userAnswer ? 'bg-destructive/10 border border-destructive' :
                                    'bg-muted'
                                  }`}
                                >
                                  <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)})</span>
                                  {option}
                                  {optIndex === question.correctAnswer && (
                                    <CheckCircle className="inline ml-2 h-4 w-4 text-success" />
                                  )}
                                  {optIndex === userAnswer && optIndex !== question.correctAnswer && (
                                    <XCircle className="inline ml-2 h-4 w-4 text-destructive" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.type === 'subjective' && (
                            <div className="space-y-2 text-sm">
                              <div className="p-3 bg-muted rounded">
                                <p className="font-medium mb-1">Your Answer:</p>
                                <p>{userAnswer || 'No answer provided'}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          {isCorrect ? (
                            <CheckCircle className="h-6 w-6 text-success" />
                          ) : (
                            <XCircle className="h-6 w-6 text-destructive" />
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            {isCorrect ? `+${question.marks}` : '0'} marks
                          </div>
                        </div>
                      </div>
                      
                      {question.explanation && (
                        <div className="border-t pt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Explanation:</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Subject-wise Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Geography', 'Biology', 'Astronomy', 'Mathematics'].map((subject) => {
                    const subjectQuestions = questions.filter(q => q.subject === subject);
                    const correctAnswers = subjectQuestions.filter(q => 
                      result.answers[q.id] === q.correctAnswer
                    ).length;
                    const percentage = subjectQuestions.length > 0 
                      ? Math.round((correctAnswers / subjectQuestions.length) * 100)
                      : 0;
                    
                    return (
                      <div key={subject} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{subject}</span>
                          <span>{correctAnswers}/{subjectQuestions.length} ({percentage}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Difficulty Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['easy', 'medium', 'hard'].map((difficulty) => {
                    const difficultyQuestions = questions.filter(q => q.difficulty === difficulty);
                    const correctAnswers = difficultyQuestions.filter(q => 
                      result.answers[q.id] === q.correctAnswer
                    ).length;
                    const percentage = difficultyQuestions.length > 0 
                      ? Math.round((correctAnswers / difficultyQuestions.length) * 100)
                      : 0;
                    
                    return (
                      <div key={difficulty} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium capitalize">{difficulty}</span>
                          <span>{correctAnswers}/{difficultyQuestions.length} ({percentage}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}