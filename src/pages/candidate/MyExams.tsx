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
  Download
} from 'lucide-react';
import { sampleExams, sampleUsers } from '@/data/sampleData';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

export default function MyExams() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSystemCheck, setShowSystemCheck] = useState(false);
  const [systemCheckResults, setSystemCheckResults] = useState({
    camera: 'checking',
    microphone: 'checking',
    browser: 'passed',
    internet: 'passed'
  });

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
    
    // Simulate system checks
    setSystemCheckResults({
      camera: 'checking',
      microphone: 'checking',
      browser: 'passed',
      internet: 'passed'
    });

    // Simulate system checks
    setTimeout(() => {
      setSystemCheckResults(prev => ({
        ...prev,
        camera: Math.random() > 0.3 ? 'passed' : 'failed'
      }));
    }, 1000);

    setTimeout(() => {
      setSystemCheckResults(prev => ({
        ...prev,
        microphone: Math.random() > 0.2 ? 'passed' : 'failed'
      }));
    }, 1500);
  };

  const handleStartExam = (examId: string) => {
    navigate(`/exam/${examId}`);
  };

  const handleViewResult = () => {
    navigate('/candidate/results');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'checking': return <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
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
                <Button className="bg-gradient-primary" onClick={() => handleStartExam(exam.id)}>
                  <Play className="mr-2 h-4 w-4" />
                  Start Exam
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
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-muted-foreground" />
                <span>Camera Access</span>
              </div>
              {getStatusIcon(systemCheckResults.camera)}
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Mic className="h-5 w-5 text-muted-foreground" />
                <span>Microphone Access</span>
              </div>
              {getStatusIcon(systemCheckResults.microphone)}
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <span>Browser Compatibility</span>
              </div>
              {getStatusIcon(systemCheckResults.browser)}
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>Internet Connection</span>
              </div>
              {getStatusIcon(systemCheckResults.internet)}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowSystemCheck(false)}>
              Close
            </Button>
            <Button onClick={runSystemCheck}>
              Retry Check
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}