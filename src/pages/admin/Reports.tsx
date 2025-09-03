import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  BarChart3, 
  Download, 
  FileText, 
  TrendingUp, 
  Users, 
  Calendar as CalendarIcon,
  Clock,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Target,
  PieChart,
  Filter,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { sampleResults, sampleExams, sampleUsers } from '@/data/sampleData';
import DetailedReportModal from '@/components/admin/DetailedReportModal';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedExam, setSelectedExam] = useState('all');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedExamForDetail, setSelectedExamForDetail] = useState<string | undefined>();

  const candidates = sampleUsers.filter(u => u.role === 'candidate');
  
  // Calculate analytics
  const analytics = {
    totalExams: sampleExams.length,
    totalCandidates: candidates.length,
    totalResults: sampleResults.length,
    averageScore: sampleResults.length > 0 
      ? Math.round(sampleResults.reduce((sum, r) => sum + r.percentage, 0) / sampleResults.length)
      : 0,
    passRate: sampleResults.length > 0 
      ? Math.round((sampleResults.filter(r => r.status === 'passed').length / sampleResults.length) * 100)
      : 0,
    completionRate: 85
  };

  const performanceBySubject = [
    { subject: 'Mathematics', avgScore: 78, totalStudents: 45, passRate: 82 },
    { subject: 'Science', avgScore: 74, totalStudents: 38, passRate: 76 },
    { subject: 'English', avgScore: 81, totalStudents: 52, passRate: 88 },
    { subject: 'History', avgScore: 69, totalStudents: 28, passRate: 71 }
  ];

  const examTrends = [
    { month: 'Jan', exams: 12, participants: 156, avgScore: 76 },
    { month: 'Feb', exams: 15, participants: 189, avgScore: 78 },
    { month: 'Mar', exams: 8, participants: 98, avgScore: 81 },
    { month: 'Apr', exams: 18, participants: 234, avgScore: 75 },
    { month: 'May', exams: 22, participants: 287, avgScore: 79 },
    { month: 'Jun', exams: 19, participants: 245, avgScore: 82 }
  ];

  const proctoringStats = {
    totalViolations: 24,
    highSeverity: 6,
    mediumSeverity: 12,
    lowSeverity: 6,
    violationTypes: [
      { type: 'Tab Switch', count: 10, percentage: 42 },
      { type: 'Face Not Detected', count: 6, percentage: 25 },
      { type: 'Multiple Faces', count: 5, percentage: 21 },
      { type: 'Suspicious Activity', count: 3, percentage: 12 }
    ]
  };

  const topPerformers = [
    { name: 'Emily Davis', avgScore: 94, examsCompleted: 8, rank: 1 },
    { name: 'John Smith', avgScore: 89, examsCompleted: 6, rank: 2 },
    { name: 'Michael Brown', avgScore: 87, examsCompleted: 7, rank: 3 },
    { name: 'Sarah Wilson', avgScore: 85, examsCompleted: 9, rank: 4 },
    { name: 'David Johnson', avgScore: 82, examsCompleted: 5, rank: 5 }
  ];

  const exportReport = (format: 'pdf' | 'csv' | 'excel') => {
    console.log(`Exporting report as ${format}`);
    // Implementation would generate and download the report
  };

  const viewDetailedReport = (examId?: string) => {
    setSelectedExamForDetail(examId);
    setDetailModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into exam performance and system usage
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          
          <Button variant="outline" onClick={() => viewDetailedReport()}>
            <Eye className="mr-2 h-4 w-4" />
            View System Report
          </Button>
        </div>
      </div>

      <Tabs value={selectedReport} onValueChange={setSelectedReport}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="proctoring">Proctoring</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="detailed">Detailed</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Exams</p>
                    <p className="text-2xl font-bold">{analytics.totalExams}</p>
                    <p className="text-xs text-success">+12% from last month</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold">{analytics.averageScore}%</p>
                    <p className="text-xs text-success">+2.1% improvement</p>
                  </div>
                  <Target className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pass Rate</p>
                    <p className="text-2xl font-bold">{analytics.passRate}%</p>
                    <p className="text-xs text-warning">-1.5% from target</p>
                  </div>
                  <Trophy className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                    <p className="text-2xl font-bold">{analytics.completionRate}%</p>
                    <p className="text-xs text-success">+3.2% increase</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Exam Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center space-y-2">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Monthly exam trends chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Performance by Subject
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceBySubject.map((subject, index) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{subject.subject}</span>
                      <span>{subject.avgScore}% avg</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subject.avgScore}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{subject.totalStudents} students</span>
                      <span>{subject.passRate}% pass rate</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  Top Performers
                </CardTitle>
                <CardDescription>
                  Highest scoring candidates this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((performer) => (
                    <div key={performer.name} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          performer.rank === 1 ? 'bg-warning text-white' :
                          performer.rank === 2 ? 'bg-muted text-foreground' :
                          performer.rank === 3 ? 'bg-orange-100 text-orange-700' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {performer.rank}
                        </div>
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {performer.examsCompleted} exams completed
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-success">
                        {performer.avgScore}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>
                  Overall grade breakdown across all exams
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { grade: 'A (90-100%)', count: 23, percentage: 15 },
                  { grade: 'B (80-89%)', count: 45, percentage: 29 },
                  { grade: 'C (70-79%)', count: 52, percentage: 33 },
                  { grade: 'D (60-69%)', count: 28, percentage: 18 },
                  { grade: 'F (0-59%)', count: 8, percentage: 5 }
                ].map((item) => (
                  <div key={item.grade} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.grade}</span>
                      <span>{item.count} students ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="proctoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Violations</p>
                    <p className="text-2xl font-bold">{proctoringStats.totalViolations}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High Severity</p>
                    <p className="text-2xl font-bold text-destructive">{proctoringStats.highSeverity}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Detection Rate</p>
                    <p className="text-2xl font-bold">98.5%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Violation Types Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {proctoringStats.violationTypes.map((violation) => (
                <div key={violation.type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{violation.type}</span>
                    <span>{violation.count} incidents ({violation.percentage}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-destructive h-2 rounded-full transition-all duration-300"
                      style={{ width: `${violation.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Performance Summary</CardTitle>
              <CardDescription>
                Individual candidate statistics and progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidates.slice(0, 5).map((candidate, index) => {
                  const candidateResults = sampleResults.filter(r => r.candidateId === candidate.id);
                  const avgScore = candidateResults.length > 0 
                    ? Math.round(candidateResults.reduce((sum, r) => sum + r.percentage, 0) / candidateResults.length)
                    : 0;
                  
                  return (
                    <div key={candidate.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <h4 className="font-medium">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <div className="text-lg font-bold">{avgScore}%</div>
                        <p className="text-xs text-muted-foreground">
                          {candidateResults.length} exams completed
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="flex gap-4 mb-6">
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {sampleExams.map(exam => (
                  <SelectItem key={exam.id} value={exam.id}>{exam.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Exam Reports</CardTitle>
              <CardDescription>
                Comprehensive analysis of individual exam performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleExams.map(exam => {
                  const examResults = sampleResults.filter(r => r.examId === exam.id);
                  const avgScore = examResults.length > 0 
                    ? Math.round(examResults.reduce((sum, r) => sum + r.percentage, 0) / examResults.length)
                    : 0;
                  const passRate = examResults.length > 0 
                    ? Math.round((examResults.filter(r => r.status === 'passed').length / examResults.length) * 100)
                    : 0;
                  
                  return (
                    <div key={exam.id} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{exam.title}</h4>
                          <p className="text-sm text-muted-foreground">{exam.subject}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => viewDetailedReport(exam.id)}>
                            <Eye className="mr-1 h-3 w-3" />
                            View Report
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => exportReport('pdf')}>
                            <Download className="mr-1 h-3 w-3" />
                            Export
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold">{examResults.length}</div>
                          <div className="text-xs text-muted-foreground">Participants</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{avgScore}%</div>
                          <div className="text-xs text-muted-foreground">Avg Score</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{passRate}%</div>
                          <div className="text-xs text-muted-foreground">Pass Rate</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{exam.duration}m</div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <DetailedReportModal 
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        examId={selectedExamForDetail}
      />
    </div>
  );
}