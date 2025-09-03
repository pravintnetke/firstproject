import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Download,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  BarChart3
} from 'lucide-react';
import { sampleResults, sampleExams, sampleUsers, ExamResult } from '@/data/sampleData';
import { format } from 'date-fns';
import ResultDetailModal from '@/components/exam/ResultDetailModal';
import { useState } from 'react';

export default function Results() {
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  
  // Get current candidate's results
  const currentCandidate = sampleUsers.find(u => u.role === 'candidate');
  const myResults = sampleResults.filter(result => 
    result.candidateId === currentCandidate?.id
  );

  const overallStats = {
    totalExams: myResults.length,
    passedExams: myResults.filter(r => r.status === 'passed').length,
    averageScore: myResults.length > 0 
      ? Math.round(myResults.reduce((sum, r) => sum + r.percentage, 0) / myResults.length)
      : 0,
    totalTimeTaken: myResults.reduce((sum, r) => sum + r.timeTaken, 0)
  };

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

  const viewResult = (result: ExamResult) => {
    setSelectedResult(result);
    setDetailModalOpen(true);
  };

  const exportAllResults = () => {
    console.log('Exporting all results');
    // Implementation would generate and download all results
  };

  const downloadReport = (result: ExamResult) => {
    const exam = sampleExams.find(e => e.id === result.examId);
    const reportData = {
      examTitle: exam?.title || 'Unknown Exam',
      candidateName: currentCandidate?.name || 'Unknown',
      score: result.score,
      totalMarks: result.totalMarks,
      percentage: result.percentage,
      status: result.status,
      timeTaken: result.timeTaken,
      submittedAt: result.submittedAt,
      subject: exam?.subject || 'Unknown'
    };

    // Create and download PDF-like report content
    const reportContent = `
EXAM RESULT REPORT
==================

Candidate: ${reportData.candidateName}
Exam: ${reportData.examTitle}
Subject: ${reportData.subject}
Date: ${format(new Date(reportData.submittedAt), 'PPP')}

PERFORMANCE SUMMARY
==================
Score: ${reportData.score}/${reportData.totalMarks}
Percentage: ${reportData.percentage}%
Status: ${reportData.status.toUpperCase()}
Time Taken: ${reportData.timeTaken} minutes

Generated on: ${format(new Date(), 'PPP p')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportData.examTitle.replace(/\s+/g, '_')}_Report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const ResultCard = ({ result }: { result: ExamResult }) => {
    const exam = sampleExams.find(e => e.id === result.examId);
    const { grade, color } = getGradeFromPercentage(result.percentage);
    
    return (
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{exam?.title}</h3>
              <p className="text-sm text-muted-foreground">{exam?.subject}</p>
            </div>
            
            <div className="text-right space-y-2">
              <Badge className={`${color} text-white text-lg px-3 py-1`}>
                {grade}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {format(new Date(result.submittedAt), 'MMM dd, yyyy')}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Score Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Score</span>
                <span className={`font-semibold ${getScoreColor(result.percentage)}`}>
                  {result.score}/{result.totalMarks} ({result.percentage}%)
                </span>
              </div>
              <Progress value={result.percentage} className="h-2" />
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  {result.status === 'passed' ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {result.status === 'passed' ? 'Passed' : 'Failed'}
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{result.timeTaken}m</span>
                </div>
                <p className="text-xs text-muted-foreground">Time Taken</p>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  {Math.round((result.score / result.totalMarks) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <Badge 
              variant={result.status === 'passed' ? 'default' : 'destructive'}
              className={result.status === 'passed' ? 'bg-success' : ''}
            >
              {result.status === 'passed' ? 'PASSED' : 'FAILED'}
            </Badge>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => viewResult(result)}>
                <Eye className="mr-1 h-3 w-3" />
                View
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadReport(result)}>
                <Download className="mr-1 h-3 w-3" />
                Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Results</h1>
          <p className="text-muted-foreground">
            Track your exam performance and progress
          </p>
        </div>
        
        <Button variant="outline" onClick={exportAllResults}>
          <Download className="mr-2 h-4 w-4" />
          Export All Results
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Exams</p>
                <p className="text-2xl font-bold">{overallStats.totalExams}</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Passed</p>
                <p className="text-2xl font-bold text-success">{overallStats.passedExams}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(overallStats.averageScore)}`}>
                  {overallStats.averageScore}%
                </p>
              </div>
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Spent</p>
                <p className="text-2xl font-bold">{overallStats.totalTimeTaken}m</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Trend
          </CardTitle>
          <CardDescription>
            Your exam scores over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="text-center space-y-2">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Performance chart visualization</p>
              <p className="text-sm text-muted-foreground">Track your progress across multiple exams</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Results ({myResults.length})</TabsTrigger>
          <TabsTrigger value="passed">
            Passed ({myResults.filter(r => r.status === 'passed').length})
          </TabsTrigger>
          <TabsTrigger value="failed">
            Failed ({myResults.filter(r => r.status === 'failed').length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {myResults.length > 0 ? (
            <div className="grid gap-4">
              {myResults.map(result => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                <p className="text-muted-foreground">
                  Complete some exams to see your results here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="passed" className="space-y-4">
          <div className="grid gap-4">
            {myResults.filter(r => r.status === 'passed').map(result => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="failed" className="space-y-4">
          <div className="grid gap-4">
            {myResults.filter(r => r.status === 'failed').map(result => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ResultDetailModal 
        result={selectedResult}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
      />
    </div>
  );
}