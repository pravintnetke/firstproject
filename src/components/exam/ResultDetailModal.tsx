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
    if (format === 'pdf') {
      generatePDFReport();
    } else {
      generateCSVReport();
    }
  };

  const generatePDFReport = () => {
    // Create PDF content using browser's print functionality
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const correctAnswers = Object.keys(result.answers).filter(qId => {
      const question = questions.find(q => q.id === qId);
      return question && result.answers[qId] === question.correctAnswer;
    }).length;

    const subjectBreakdown = ['Geography', 'Biology', 'Astronomy', 'Mathematics'].map(subject => {
      const subjectQuestions = questions.filter(q => q.subject === subject);
      const correctAnswers = subjectQuestions.filter(q => 
        result.answers[q.id] === q.correctAnswer
      ).length;
      const percentage = subjectQuestions.length > 0 
        ? Math.round((correctAnswers / subjectQuestions.length) * 100)
        : 0;
      return { subject, correct: correctAnswers, total: subjectQuestions.length, percentage };
    });

    const difficultyBreakdown = ['easy', 'medium', 'hard'].map(difficulty => {
      const difficultyQuestions = questions.filter(q => q.difficulty === difficulty);
      const correctAnswers = difficultyQuestions.filter(q => 
        result.answers[q.id] === q.correctAnswer
      ).length;
      const percentage = difficultyQuestions.length > 0 
        ? Math.round((correctAnswers / difficultyQuestions.length) * 100)
        : 0;
      return { difficulty, correct: correctAnswers, total: difficultyQuestions.length, percentage };
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Exam Result Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .info-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dotted #ccc; }
        .score-box { text-align: center; border: 2px solid #333; padding: 20px; margin: 20px 0; }
        .grade { font-size: 2em; font-weight: bold; color: ${result.percentage >= 80 ? '#22c55e' : result.percentage >= 60 ? '#f59e0b' : '#ef4444'}; }
        .breakdown-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .breakdown-table th, .breakdown-table td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        .breakdown-table th { background-color: #f5f5f5; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>DETAILED EXAM RESULT REPORT</h1>
        <p><strong>${exam?.title || 'Unknown Exam'}</strong></p>
        <p>Generated on: ${format(new Date(), 'PPP p')}</p>
      </div>

      <div class="section">
        <h2>Candidate Information</h2>
        <div class="info-item"><span>Exam:</span><span>${exam?.title || 'Unknown Exam'}</span></div>
        <div class="info-item"><span>Subject:</span><span>${exam?.subject || 'Unknown'}</span></div>
        <div class="info-item"><span>Date:</span><span>${format(new Date(result.submittedAt), 'PPP')}</span></div>
        <div class="info-item"><span>Duration:</span><span>${exam?.duration || 0} minutes</span></div>
      </div>

      <div class="section">
        <h2>Performance Summary</h2>
        <div class="score-box">
          <div class="grade">${getGradeFromPercentage(result.percentage).grade}</div>
          <div style="font-size: 1.5em; margin: 10px 0;">${result.score}/${result.totalMarks} (${result.percentage}%)</div>
          <div style="color: ${result.status === 'passed' ? '#22c55e' : '#ef4444'}; font-weight: bold; font-size: 1.2em;">
            ${result.status.toUpperCase()}
          </div>
        </div>
        <div class="info-item"><span>Time Taken:</span><span>${result.timeTaken} minutes</span></div>
        <div class="info-item"><span>Time Remaining:</span><span>${(exam?.duration || 0) - result.timeTaken} minutes</span></div>
      </div>

      <div class="section">
        <h2>Question Analysis</h2>
        <div class="info-item"><span>Total Questions:</span><span>${questions.length}</span></div>
        <div class="info-item"><span>Correct Answers:</span><span>${correctAnswers}</span></div>
        <div class="info-item"><span>Accuracy Rate:</span><span>${Math.round((correctAnswers / questions.length) * 100)}%</span></div>
      </div>

      <div class="section">
        <h2>Subject-wise Breakdown</h2>
        <table class="breakdown-table">
          <tr><th>Subject</th><th>Correct</th><th>Total</th><th>Percentage</th></tr>
          ${subjectBreakdown.map(item => `
            <tr>
              <td>${item.subject}</td>
              <td>${item.correct}</td>
              <td>${item.total}</td>
              <td>${item.percentage}%</td>
            </tr>
          `).join('')}
        </table>
      </div>

      <div class="section">
        <h2>Difficulty Analysis</h2>
        <table class="breakdown-table">
          <tr><th>Difficulty</th><th>Correct</th><th>Total</th><th>Percentage</th></tr>
          ${difficultyBreakdown.map(item => `
            <tr>
              <td style="text-transform: capitalize;">${item.difficulty}</td>
              <td>${item.correct}</td>
              <td>${item.total}</td>
              <td>${item.percentage}%</td>
            </tr>
          `).join('')}
        </table>
      </div>
    </body>
    </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const generateCSVReport = () => {
    const csvData = [
      ['Question', 'Subject', 'Difficulty', 'Your Answer', 'Correct Answer', 'Status', 'Marks'],
      ...questions.map((question, index) => [
        `Q${index + 1}`,
        question.subject,
        question.difficulty,
        question.type === 'mcq' && question.options 
          ? (result.answers[question.id] !== undefined ? question.options[result.answers[question.id] as number] : 'Not answered')
          : result.answers[question.id] || 'Not answered',
        question.type === 'mcq' && question.options 
          ? question.options[question.correctAnswer as number]
          : question.correctAnswer,
        result.answers[question.id] === question.correctAnswer ? 'Correct' : 'Incorrect',
        result.answers[question.id] === question.correctAnswer ? question.marks : 0
      ])
    ];

    const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exam?.title?.replace(/\s+/g, '_') || 'Exam'}_Results.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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