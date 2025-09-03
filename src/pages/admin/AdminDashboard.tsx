import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { dashboardStats, monthlyExamCalendar } from '@/data/sampleData';
import { useNavigate } from 'react-router-dom';

const workflowSteps = [
  { id: 1, title: 'Create Question Bank', status: 'completed' },
  { id: 2, title: 'Design Exam', status: 'completed' },
  { id: 3, title: 'Configure Proctoring', status: 'current' },
  { id: 4, title: 'Assign Candidates', status: 'pending' },
  { id: 5, title: 'Schedule & Publish', status: 'pending' },
  { id: 6, title: 'Monitor & Report', status: 'pending' }
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Dr. Johnson. Here's your exam portal overview.
          </p>
        </div>
        <Button className="bg-gradient-primary" onClick={() => navigate('/admin/create-exam')}>
          <BookOpen className="mr-2 h-4 w-4" />
          Create New Exam
        </Button>
      </div>

      {/* Workflow Banner */}
      <Card className="bg-gradient-card dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Exam Creation Workflow
          </CardTitle>
          <CardDescription>
            Follow these 6 steps to create and manage your exams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 min-w-fit">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.status === 'completed'
                        ? 'bg-success text-success-foreground'
                        : step.status === 'current'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="w-8 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalExams}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.activeExams}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalCandidates}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12</span> new registrations
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+2.1%</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Proctoring Alerts */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-warning" />
              Proctoring Alerts
            </CardTitle>
            <CardDescription>
              Recent security and monitoring events
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <div>
                  <p className="text-sm font-medium">Tab Switching Detected</p>
                  <p className="text-xs text-muted-foreground">John Smith - Physics Exam</p>
                </div>
              </div>
              <Badge variant="destructive" className="text-xs">High</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full" />
                <div>
                  <p className="text-sm font-medium">Face Recognition OK</p>
                  <p className="text-xs text-muted-foreground">Emily Davis - Math Test</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">Low</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <div>
                  <p className="text-sm font-medium">Multiple Faces Detected</p>
                  <p className="text-xs text-muted-foreground">Michael Brown - Chemistry Quiz</p>
                </div>
              </div>
              <Badge variant="destructive" className="text-xs">Medium</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Exam Calendar */}
        <Card className="lg:col-span-2 dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Exams
            </CardTitle>
            <CardDescription>
              March 2024 exam schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyExamCalendar.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {new Date(exam.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{exam.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(exam.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })} at {exam.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {new Date(exam.date) > new Date() ? 'Scheduled' : 'Active'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => navigate('/admin/create-exam')}>
              <BookOpen className="h-6 w-6" />
              <span>Create Exam</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => navigate('/admin/candidates')}>
              <Users className="h-6 w-6" />
              <span>Add Candidates</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => navigate('/admin/proctoring')}>
              <Shield className="h-6 w-6" />
              <span>Review Violations</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2" onClick={() => navigate('/admin/reports')}>
              <TrendingUp className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}