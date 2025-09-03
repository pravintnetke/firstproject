import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3,
  Download, 
  FileText,
  TrendingUp,
  Users,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { format } from 'date-fns';
import { sampleResults, sampleExams, sampleUsers } from '@/data/sampleData';

interface DetailedReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examId?: string;
}

export default function DetailedReportModal({ open, onOpenChange, examId }: DetailedReportModalProps) {
  const exam = examId ? sampleExams.find(e => e.id === examId) : null;
  const examResults = examId ? sampleResults.filter(r => r.examId === examId) : sampleResults;
  const candidates = sampleUsers.filter(u => u.role === 'candidate');

  if (!exam && examId) return null;

  const analytics = {
    totalAttempts: examResults.length,
    averageScore: examResults.length > 0 
      ? Math.round(examResults.reduce((sum, r) => sum + r.percentage, 0) / examResults.length)
      : 0,
    highestScore: examResults.length > 0 
      ? Math.max(...examResults.map(r => r.percentage))
      : 0,
    passRate: examResults.length > 0 
      ? Math.round((examResults.filter(r => r.status === 'passed').length / examResults.length) * 100)
      : 0,
    averageTime: examResults.length > 0 
      ? Math.round(examResults.reduce((sum, r) => sum + r.timeTaken, 0) / examResults.length)
      : 0
  };

  const gradeDistribution = [
    { grade: 'A+ (90-100%)', count: examResults.filter(r => r.percentage >= 90).length },
    { grade: 'A (80-89%)', count: examResults.filter(r => r.percentage >= 80 && r.percentage < 90).length },
    { grade: 'B+ (70-79%)', count: examResults.filter(r => r.percentage >= 70 && r.percentage < 80).length },
    { grade: 'B (60-69%)', count: examResults.filter(r => r.percentage >= 60 && r.percentage < 70).length },
    { grade: 'C (50-59%)', count: examResults.filter(r => r.percentage >= 50 && r.percentage < 60).length },
    { grade: 'F (0-49%)', count: examResults.filter(r => r.percentage < 50).length }
  ];

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting detailed report as ${format}`);
    // Implementation would generate and download the detailed report
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{exam ? `${exam.title} - Detailed Report` : 'Comprehensive System Report'}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => exportReport('pdf')}>
                <Download className="mr-1 h-3 w-3" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportReport('excel')}>
                <Download className="mr-1 h-3 w-3" />
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportReport('csv')}>
                <Download className="mr-1 h-3 w-3" />
                CSV
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            {exam 
              ? `Comprehensive analysis for ${exam.title} conducted on ${format(new Date(exam.startDate), 'PPP')}`
              : 'System-wide performance analytics and insights'
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Attempts</p>
                      <p className="text-2xl font-bold">{analytics.totalAttempts}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                      <p className="text-2xl font-bold">{analytics.averageScore}%</p>
                    </div>
                    <Target className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pass Rate</p>
                      <p className="text-2xl font-bold">{analytics.passRate}%</p>
                    </div>
                    <Trophy className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Time</p>
                      <p className="text-2xl font-bold">{analytics.averageTime}m</p>
                    </div>
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Breakdown of performance grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gradeDistribution.map((item) => {
                    const percentage = analytics.totalAttempts > 0 
                      ? Math.round((item.count / analytics.totalAttempts) * 100)
                      : 0;
                    
                    return (
                      <div key={item.grade} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.grade}</span>
                          <span>{item.count} students ({percentage}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Score Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Score Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Score distribution histogram</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time vs Score Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Time vs Score Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <div className="text-center space-y-2">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Time vs performance correlation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Performance Details</CardTitle>
                <CardDescription>Individual candidate results and rankings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Time Taken</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examResults
                      .sort((a, b) => b.percentage - a.percentage)
                      .map((result, index) => {
                        const candidate = candidates.find(c => c.id === result.candidateId);
                        return (
                          <TableRow key={result.id}>
                            <TableCell className="font-medium">#{index + 1}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{candidate?.name || 'Unknown'}</p>
                                <p className="text-xs text-muted-foreground">{candidate?.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{result.score}/{result.totalMarks}</TableCell>
                            <TableCell>
                              <span className={`font-medium ${
                                result.percentage >= 80 ? 'text-success' :
                                result.percentage >= 60 ? 'text-warning' :
                                'text-destructive'
                              }`}>
                                {result.percentage}%
                              </span>
                            </TableCell>
                            <TableCell>{result.timeTaken}m</TableCell>
                            <TableCell>
                              <Badge 
                                variant={result.status === 'passed' ? 'default' : 'destructive'}
                                className={result.status === 'passed' ? 'bg-success' : ''}
                              >
                                {result.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-success">Strong Performance</p>
                      <p className="text-sm text-muted-foreground">
                        {gradeDistribution.filter(g => g.grade.includes('A')).reduce((sum, g) => sum + g.count, 0)} candidates scored above 80%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div>
                      <p className="font-medium text-warning">Areas for Improvement</p>
                      <p className="text-sm text-muted-foreground">
                        {gradeDistribution.filter(g => g.grade.includes('F') || g.grade.includes('C')).reduce((sum, g) => sum + g.count, 0)} candidates need additional support
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-primary">Average Performance</p>
                      <p className="text-sm text-muted-foreground">
                        Overall class average of {analytics.averageScore}% indicates good understanding
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">For Low Performers:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Schedule one-on-one tutoring sessions</li>
                      <li>• Provide additional practice materials</li>
                      <li>• Consider alternative assessment methods</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">For High Performers:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Offer advanced/enrichment activities</li>
                      <li>• Peer tutoring opportunities</li>
                      <li>• Leadership roles in group projects</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">General Improvements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Review questions with low success rates</li>
                      <li>• Adjust time allocation if needed</li>
                      <li>• Update curriculum based on weak areas</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}