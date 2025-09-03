import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Clock,
  Shield,
  Settings,
  Calendar as CalendarIcon,
  Play,
  Pause,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { sampleExams, sampleUsers, sampleQuestions } from '@/data/sampleData';
import { toast } from '@/hooks/use-toast';

export default function ExamManagement() {
  const [exams, setExams] = useState(sampleExams);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    subject: '',
    duration: 60,
    totalMarks: 100,
    passingMarks: 40,
    negativeMarking: false,
    randomizeQuestions: true,
    proctoringEnabled: true,
    startDate: new Date(),
    endDate: new Date(),
    questions: [] as string[],
    assignedCandidates: [] as string[]
  });

  const candidates = sampleUsers.filter(u => u.role === 'candidate');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success';
      case 'draft': return 'bg-warning';
      case 'completed': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <Play className="h-4 w-4" />;
      case 'draft': return <Pause className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleCreateExam = () => {
    const exam = {
      id: `e${exams.length + 1}`,
      ...newExam,
      status: 'draft' as const,
      startDate: newExam.startDate.toISOString(),
      endDate: newExam.endDate.toISOString(),
      questions: sampleQuestions.slice(0, 4), // Sample questions
      examType: 'semester' as const
    };
    
    setExams([...exams, exam]);
    setShowCreateDialog(false);
    setCurrentStep(1);
    setNewExam({
      title: '',
      description: '',
      subject: '',
      duration: 60,
      totalMarks: 100,
      passingMarks: 40,
      negativeMarking: false,
      randomizeQuestions: true,
      proctoringEnabled: true,
      startDate: new Date(),
      endDate: new Date(),
      questions: [],
      assignedCandidates: []
    });
    
    toast({
      title: 'Exam Created',
      description: 'New exam has been created successfully.',
    });
  };

  const wizardSteps = [
    { id: 1, title: 'General Settings', icon: Settings },
    { id: 2, title: 'Question Pool', icon: Edit },
    { id: 3, title: 'Proctoring', icon: Shield },
    { id: 4, title: 'Scheduling', icon: CalendarIcon },
    { id: 5, title: 'Assignment', icon: Users }
  ];

  const renderWizardStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exam Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Final Mathematics Exam"
                  value={newExam.title}
                  onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics"
                  value={newExam.subject}
                  onChange={(e) => setNewExam({...newExam, subject: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the exam purpose and content..."
                value={newExam.description}
                onChange={(e) => setNewExam({...newExam, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newExam.duration}
                  onChange={(e) => setNewExam({...newExam, duration: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Input
                  id="totalMarks"
                  type="number"
                  value={newExam.totalMarks}
                  onChange={(e) => setNewExam({...newExam, totalMarks: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passingMarks">Passing Marks</Label>
                <Input
                  id="passingMarks"
                  type="number"
                  value={newExam.passingMarks}
                  onChange={(e) => setNewExam({...newExam, passingMarks: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Edit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Question Pool Setup</h3>
              <p className="text-muted-foreground mb-4">
                Select questions from your question bank or create new ones
              </p>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="outline">4 questions selected</Badge>
                <Badge variant="secondary">Mixed difficulties</Badge>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Proctoring Settings</h3>
                <p className="text-sm text-muted-foreground">Configure monitoring and security features</p>
              </div>
              <Switch
                checked={newExam.proctoringEnabled}
                onCheckedChange={(checked) => setNewExam({...newExam, proctoringEnabled: checked})}
              />
            </div>
            
            {newExam.proctoringEnabled && (
              <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                <div className="flex items-center justify-between">
                  <Label>Webcam Recording</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Screen Recording</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Tab Switch Detection</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Face Detection</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Audio Monitoring</Label>
                  <Switch />
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Randomize Questions</Label>
                <Switch
                  checked={newExam.randomizeQuestions}
                  onCheckedChange={(checked) => setNewExam({...newExam, randomizeQuestions: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Negative Marking</Label>
                <Switch
                  checked={newExam.negativeMarking}
                  onCheckedChange={(checked) => setNewExam({...newExam, negativeMarking: checked})}
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newExam.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newExam.startDate ? format(newExam.startDate, "PPP") : "Pick start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newExam.startDate}
                      onSelect={(date) => date && setNewExam({...newExam, startDate: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newExam.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newExam.endDate ? format(newExam.endDate, "PPP") : "Pick end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newExam.endDate}
                      onSelect={(date) => date && setNewExam({...newExam, endDate: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Exam Window</h4>
              <p className="text-sm text-muted-foreground">
                Students can start the exam anytime within this window. Once started, they'll have {newExam.duration} minutes to complete it.
              </p>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Assign to Candidates</Label>
              <div className="max-h-60 overflow-y-auto border rounded-md">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-center space-x-2 p-3 border-b last:border-b-0">
                    <input
                      type="checkbox"
                      id={`candidate-${candidate.id}`}
                      className="rounded"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewExam({
                            ...newExam,
                            assignedCandidates: [...newExam.assignedCandidates, candidate.id]
                          });
                        } else {
                          setNewExam({
                            ...newExam,
                            assignedCandidates: newExam.assignedCandidates.filter(id => id !== candidate.id)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`candidate-${candidate.id}`} className="flex-1 cursor-pointer">
                      {candidate.name} ({candidate.email})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-medium mb-2">Assignment Summary</h4>
              <p className="text-sm text-muted-foreground">
                {newExam.assignedCandidates.length} candidates will be notified via email and SMS with login credentials.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Exam Management</h1>
          <p className="text-muted-foreground">
            Create, configure, and manage your examinations
          </p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Create Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Exam</DialogTitle>
              <DialogDescription>
                Follow the 5-step wizard to set up your examination
              </DialogDescription>
            </DialogHeader>
            
            {/* Wizard Steps */}
            <div className="flex items-center justify-between mb-6">
              {wizardSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : currentStep > step.id
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <p className="text-sm font-medium">{step.title}</p>
                  </div>
                  {index < wizardSteps.length - 1 && (
                    <div className="w-12 h-0.5 bg-border mx-4" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Step Content */}
            <div className="min-h-[300px]">
              {renderWizardStep()}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentStep < 5 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                    className="bg-gradient-primary"
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleCreateExam} className="bg-gradient-primary">
                    Create Exam
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Exam List */}
      <div className="space-y-4">
        {exams.map((exam) => (
          <Card key={exam.id} className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{exam.title}</h3>
                    <Badge className={`${getStatusColor(exam.status)} text-white`}>
                      {getStatusIcon(exam.status)}
                      <span className="ml-1 capitalize">{exam.status}</span>
                    </Badge>
                    {exam.proctoringEnabled && (
                      <Badge variant="outline">
                        <Shield className="mr-1 h-3 w-3" />
                        Proctored
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground">{exam.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Edit className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.questions.length} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.totalMarks} marks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.assignedCandidates.length} candidates</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span><strong>Subject:</strong> {exam.subject}</span>
                    <span><strong>Start:</strong> {format(new Date(exam.startDate), 'PPP')}</span>
                    <span><strong>End:</strong> {format(new Date(exam.endDate), 'PPP')}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" className="hover-scale">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="hover-scale">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover-scale text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}