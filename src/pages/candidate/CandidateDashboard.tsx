import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Award,
  Calendar,
  Eye,
  RefreshCw,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { sampleExams, sampleResults, sampleUsers } from '@/data/sampleData';
import { useSystemCheck } from '@/hooks/use-system-check';

export default function CandidateDashboard() {
  // In real app, get current candidate from auth context
  const currentCandidate = sampleUsers.find(u => u.role === 'candidate');
  const assignedExams = sampleExams.filter(exam => 
    exam.assignedCandidates.includes(currentCandidate?.id || '')
  );
  const candidateResults = sampleResults.filter(result => 
    result.candidateId === currentCandidate?.id
  );

  // System requirements check
  const { systemCheck, refreshCheck } = useSystemCheck();

  const upcomingExams = assignedExams.filter(exam => 
    exam.status === 'published' && new Date(exam.startDate) > new Date()
  );
  const activeExams = assignedExams.filter(exam => 
    exam.status === 'published' && 
    new Date(exam.startDate) <= new Date() && 
    new Date(exam.endDate) >= new Date()
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {currentCandidate?.name}. Ready for your next exam?
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <User className="mr-2 h-4 w-4" />
          View Profile
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeExams.length}</div>
            <p className="text-xs text-muted-foreground">
              Available to take now
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingExams.length}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled exams
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidateResults.length}</div>
            <p className="text-xs text-muted-foreground">
              Exams taken
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {candidateResults.length > 0 
                ? Math.round(candidateResults.reduce((sum, r) => sum + r.percentage, 0) / candidateResults.length)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Exams */}
      {activeExams.length > 0 && (
        <Card className="dashboard-card border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <AlertCircle className="h-5 w-5" />
              Active Exam Available
            </CardTitle>
            <CardDescription>
              You have exams that are currently available to take
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 rounded-lg border bg-background">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{exam.title}</h3>
                    <p className="text-sm text-muted-foreground">{exam.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Duration: {exam.duration} minutes</span>
                      <span>Total Marks: {exam.totalMarks}</span>
                      <span>Passing: {exam.passingMarks}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button className="bg-gradient-primary">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Exam
                    </Button>
                    <Badge variant="destructive" className="text-center">
                      Ends: {new Date(exam.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Exams */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Exams
            </CardTitle>
            <CardDescription>
              Your scheduled examinations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingExams.length > 0 ? (
                upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="space-y-1">
                      <p className="font-medium">{exam.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(exam.startDate).toLocaleDateString()} at{' '}
                        {new Date(exam.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exam.duration} minutes • {exam.totalMarks} marks
                      </p>
                    </div>
                    <Badge variant="outline">
                      {Math.ceil((new Date(exam.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming exams scheduled</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-success" />
              Recent Results
            </CardTitle>
            <CardDescription>
              Your latest exam performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidateResults.length > 0 ? (
                candidateResults.map((result) => {
                  const exam = sampleExams.find(e => e.id === result.examId);
                  return (
                    <div key={result.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="space-y-1">
                        <p className="font-medium">{exam?.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Score: {result.score}/{result.totalMarks} ({result.percentage}%)
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${result.status === 'passed' ? 'bg-success' : 'bg-destructive'}`}
                            style={{ width: `${result.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={result.status === 'passed' ? 'default' : 'destructive'}
                          className={result.status === 'passed' ? 'bg-success' : ''}
                        >
                          {result.status === 'passed' ? 'Passed' : 'Failed'}
                        </Badge>
                        <Button variant="ghost" size="sm" className="mt-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No results available yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Requirements Check */}
      <Card className={`dashboard-card ${
        systemCheck.overall === 'failed' ? 'border-destructive/50 bg-destructive/5' :
        systemCheck.overall === 'issues' ? 'border-warning/50 bg-warning/5' :
        systemCheck.overall === 'ready' ? 'border-success/50 bg-success/5' :
        'border-muted'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {systemCheck.overall === 'checking' && <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />}
                {systemCheck.overall === 'ready' && <CheckCircle className="h-5 w-5 text-success" />}
                {systemCheck.overall === 'issues' && <AlertTriangle className="h-5 w-5 text-warning" />}
                {systemCheck.overall === 'failed' && <XCircle className="h-5 w-5 text-destructive" />}
                System Requirements
              </CardTitle>
              <CardDescription>
                {systemCheck.overall === 'checking' && 'Checking your system for proctored exams...'}
                {systemCheck.overall === 'ready' && 'Your system is ready for proctored exams'}
                {systemCheck.overall === 'issues' && 'Some issues detected - exams may still work'}
                {systemCheck.overall === 'failed' && 'Critical issues found - please resolve before taking exams'}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshCheck}
              disabled={systemCheck.overall === 'checking'}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${systemCheck.overall === 'checking' ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(systemCheck).filter(([key]) => key !== 'overall').map(([key, requirement]) => {
              const getIcon = () => {
                switch (requirement.status) {
                  case 'checking':
                    return <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />;
                  case 'passed':
                    return <CheckCircle className="h-5 w-5 text-success" />;
                  case 'warning':
                    return <AlertTriangle className="h-5 w-5 text-warning" />;
                  case 'failed':
                    return <XCircle className="h-5 w-5 text-destructive" />;
                  default:
                    return <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />;
                }
              };

              const getBorderColor = () => {
                switch (requirement.status) {
                  case 'passed':
                    return 'border-success/30';
                  case 'warning':
                    return 'border-warning/30';
                  case 'failed':
                    return 'border-destructive/30';
                  default:
                    return 'border-muted';
                }
              };

              return (
                <div key={key} className={`flex items-start gap-3 p-3 rounded-lg border ${getBorderColor()}`}>
                  {getIcon()}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{requirement.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{requirement.message}</p>
                    {requirement.details && (
                      <p className="text-xs text-muted-foreground/80 mt-1 leading-tight">
                        {requirement.details}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {systemCheck.overall === 'failed' && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-destructive">Action Required</p>
                  <p className="text-muted-foreground">
                    Please resolve the failed requirements above before attempting to take any proctored exams.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {systemCheck.overall === 'issues' && (
            <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-warning">Minor Issues Detected</p>
                  <p className="text-muted-foreground">
                    Your system should work for most exams, but you may experience some limitations.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}