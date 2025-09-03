import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Camera,
  Mic,
  Monitor,
  Shield,
  Play,
  Eye,
  Download,
  RefreshCw,
  XCircle,
  Globe
} from 'lucide-react';
import { sampleExams, sampleUsers } from '@/data/sampleData';
import { useAuth } from '@/contexts/AuthContext';
import { useSystemCheck } from '@/hooks/use-system-check';
import { format } from 'date-fns';

export default function MyExams() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSystemCheck, setShowSystemCheck] = useState(false);
  const { systemCheck, refreshCheck } = useSystemCheck();

  // Get current authenticated user's exams
  const myExams = sampleExams.filter(exam => 
    exam.assignedCandidates.includes(user?.id || '')
  );

  const upcomingExams = myExams.filter(exam => 
    new Date(exam.startDate) > new Date()
  );

  const activeExams = myExams.filter(exam => 
    new Date(exam.startDate) <= new Date() && 
    new Date(exam.endDate) >= new Date()
  );

  const completedExams = myExams.filter(exam => 
    new Date(exam.endDate) < new Date()
  );

  const runSystemCheck = () => {
    setShowSystemCheck(true);
    refreshCheck();
  };

  const handleStartExam = (examId: string) => {
    // Check if system requirements are met for proctored exams
    const exam = myExams.find(e => e.id === examId);
    if (exam?.proctoringEnabled && !isSystemReady()) {
      setShowSystemCheck(true);
      refreshCheck();
      return;
    }
    navigate(`/exam/${examId}`);
  };

  const isSystemReady = () => {
    return systemCheck.overall === 'ready' || systemCheck.overall === 'checking';
  };

  const getSystemIssues = () => {
    const issues = [];
    if (systemCheck.camera.status === 'failed') issues.push('Camera access required');
    if (systemCheck.microphone.status === 'failed') issues.push('Microphone access required');
    if (systemCheck.browser.status === 'failed') issues.push('Browser not compatible');
    if (systemCheck.internet.status === 'failed') issues.push('Internet connection issues');
    return issues;
  };

  const handleViewResult = () => {
    navigate('/candidate/results');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'checking': return <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />;
      default: return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const ExamCard = ({ exam, type }: { exam: any, type: 'upcoming' | 'active' | 'completed' }) => (
    <Card className="dashboard-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{exam.title}</h3>
              {exam.proctoringEnabled && (
                <Badge variant="outline">
                  <Shield className="mr-1 h-3 w-3" />
                  Proctored
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{exam.description}</p>
          </div>
          
          {type === 'active' && (
            <Badge className="bg-success animate-pulse">
              Live Now
            </Badge>
          )}
          {type === 'upcoming' && (
            <Badge variant="outline">
              Scheduled
            </Badge>
          )}
          {type === 'completed' && (
            <Badge variant="secondary">
              Completed
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{exam.duration} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{exam.questions.length} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
            <span>{exam.totalMarks} marks</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(exam.startDate), 'MMM dd')}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span><strong>Subject:</strong> {exam.subject}</span>
          <span><strong>Passing:</strong> {exam.passingMarks}/{exam.totalMarks}</span>
          {exam.negativeMarking && (
            <Badge variant="destructive" className="text-xs">Negative Marking</Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm">
            {type === 'upcoming' && (
              <span className="text-muted-foreground">
                Starts: {format(new Date(exam.startDate), 'PPP p')}
              </span>
            )}
            {type === 'active' && (
              <span className="text-warning font-medium">
                Ends: {format(new Date(exam.endDate), 'p')}
              </span>
            )}
            {type === 'completed' && (
              <span className="text-muted-foreground">
                Ended: {format(new Date(exam.endDate), 'PPP')}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            {type === 'active' && (
              <>
                <Button variant="outline" onClick={runSystemCheck}>
                  System Check
                </Button>
                <Button 
                  className={`bg-gradient-primary ${!isSystemReady() && exam.proctoringEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleStartExam(exam.id)}
                  disabled={!isSystemReady() && exam.proctoringEnabled}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {!isSystemReady() && exam.proctoringEnabled ? 'System Check Required' : 'Start Exam'}
                </Button>
              </>
            )}
            {type === 'upcoming' && (
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            )}
            {type === 'completed' && (
              <Button variant="outline" onClick={handleViewResult}>
                <Download className="mr-2 h-4 w-4" />
                Result
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Exams</h1>
          <p className="text-muted-foreground">
            View and take your assigned examinations
          </p>
        </div>
        
        <Button variant="outline" onClick={runSystemCheck}>
          <Monitor className="mr-2 h-4 w-4" />
          System Check
        </Button>
      </div>

      {/* Active Exams - Priority Section */}
      {activeExams.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h2 className="text-xl font-semibold text-warning">Active Exams</h2>
          </div>
          {activeExams.map(exam => (
            <ExamCard key={exam.id} exam={exam} type="active" />
          ))}
        </div>
      )}

      {/* Upcoming Exams */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Exams ({upcomingExams.length})
        </h2>
        
        {upcomingExams.length > 0 ? (
          <div className="space-y-4">
            {upcomingExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} type="upcoming" />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Upcoming Exams</h3>
              <p className="text-muted-foreground">
                You don't have any exams scheduled at the moment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Completed Exams */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Completed Exams ({completedExams.length})
        </h2>
        
        {completedExams.length > 0 ? (
          <div className="space-y-4">
            {completedExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} type="completed" />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Completed Exams</h3>
              <p className="text-muted-foreground">
                Your completed exams will appear here after submission.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* System Check Dialog */}
      <Dialog open={showSystemCheck} onOpenChange={setShowSystemCheck}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>System Requirements Check</DialogTitle>
            <DialogDescription>
              Verifying your system compatibility for proctored exams
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className={`flex items-start justify-between p-3 rounded-lg border ${
              systemCheck.camera.status === 'passed' ? 'border-success/30 bg-success/5' :
              systemCheck.camera.status === 'failed' ? 'border-destructive/30 bg-destructive/5' :
              systemCheck.camera.status === 'warning' ? 'border-warning/30 bg-warning/5' :
              'border-muted'
            }`}>
              <div className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Camera Access</p>
                  <p className="text-sm text-muted-foreground">{systemCheck.camera.message}</p>
                  {systemCheck.camera.details && (
                    <p className="text-xs text-muted-foreground/80 mt-1">{systemCheck.camera.details}</p>
                  )}
                </div>
              </div>
              {getStatusIcon(systemCheck.camera.status)}
            </div>
            
            <div className={`flex items-start justify-between p-3 rounded-lg border ${
              systemCheck.microphone.status === 'passed' ? 'border-success/30 bg-success/5' :
              systemCheck.microphone.status === 'failed' ? 'border-destructive/30 bg-destructive/5' :
              systemCheck.microphone.status === 'warning' ? 'border-warning/30 bg-warning/5' :
              'border-muted'
            }`}>
              <div className="flex items-start gap-3">
                <Mic className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Microphone Access</p>
                  <p className="text-sm text-muted-foreground">{systemCheck.microphone.message}</p>
                  {systemCheck.microphone.details && (
                    <p className="text-xs text-muted-foreground/80 mt-1">{systemCheck.microphone.details}</p>
                  )}
                </div>
              </div>
              {getStatusIcon(systemCheck.microphone.status)}
            </div>
            
            <div className={`flex items-start justify-between p-3 rounded-lg border ${
              systemCheck.browser.status === 'passed' ? 'border-success/30 bg-success/5' :
              systemCheck.browser.status === 'failed' ? 'border-destructive/30 bg-destructive/5' :
              systemCheck.browser.status === 'warning' ? 'border-warning/30 bg-warning/5' :
              'border-muted'
            }`}>
              <div className="flex items-start gap-3">
                <Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Browser Compatibility</p>
                  <p className="text-sm text-muted-foreground">{systemCheck.browser.message}</p>
                  {systemCheck.browser.details && (
                    <p className="text-xs text-muted-foreground/80 mt-1">{systemCheck.browser.details}</p>
                  )}
                </div>
              </div>
              {getStatusIcon(systemCheck.browser.status)}
            </div>
            
            <div className={`flex items-start justify-between p-3 rounded-lg border ${
              systemCheck.internet.status === 'passed' ? 'border-success/30 bg-success/5' :
              systemCheck.internet.status === 'failed' ? 'border-destructive/30 bg-destructive/5' :
              systemCheck.internet.status === 'warning' ? 'border-warning/30 bg-warning/5' :
              'border-muted'
            }`}>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Internet Connection</p>
                  <p className="text-sm text-muted-foreground">{systemCheck.internet.message}</p>
                  {systemCheck.internet.details && (
                    <p className="text-xs text-muted-foreground/80 mt-1">{systemCheck.internet.details}</p>
                  )}
                </div>
              </div>
              {getStatusIcon(systemCheck.internet.status)}
            </div>
          </div>
          
          {(systemCheck.overall === 'failed' || systemCheck.overall === 'issues') && (
            <div className={`p-3 rounded-lg border mt-4 ${
              systemCheck.overall === 'failed' ? 'border-destructive/30 bg-destructive/5' : 'border-warning/30 bg-warning/5'
            }`}>
              <div className="flex items-start gap-2">
                {systemCheck.overall === 'failed' ? (
                  <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                )}
                <div className="text-sm">
                  <p className={`font-medium ${
                    systemCheck.overall === 'failed' ? 'text-destructive' : 'text-warning'
                  }`}>
                    {systemCheck.overall === 'failed' ? 'System Not Ready' : 'Minor Issues Detected'}
                  </p>
                  <p className="text-muted-foreground">
                    {systemCheck.overall === 'failed' 
                      ? 'Please resolve the failed requirements before taking proctored exams.'
                      : 'Your system should work for most exams, but you may experience some limitations.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowSystemCheck(false)}>
              Close
            </Button>
            <Button 
              onClick={refreshCheck}
              disabled={systemCheck.overall === 'checking'}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${systemCheck.overall === 'checking' ? 'animate-spin' : ''}`} />
              Retry Check
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}