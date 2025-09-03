import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const navigate = useNavigate();
  const [exams, setExams] = useState(sampleExams);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
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
    navigate('/admin/create-exam');
  };

  const handleViewExam = (exam: any) => {
    setSelectedExam(exam);
    setShowViewDialog(true);
  };

  const handleEditExam = (exam: any) => {
    setSelectedExam(exam);
    setNewExam({
      title: exam.title,
      description: exam.description,
      subject: exam.subject,
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      negativeMarking: exam.negativeMarking || false,
      randomizeQuestions: exam.randomizeQuestions !== false,
      proctoringEnabled: exam.proctoringEnabled !== false,
      startDate: new Date(exam.startDate),
      endDate: new Date(exam.endDate),
      questions: exam.questions.map((q: any) => q.id),
      assignedCandidates: exam.assignedCandidates
    });
    setCurrentStep(1);
    setShowEditDialog(true);
  };

  const handleUpdateExam = () => {
    const updatedExam = {
      ...selectedExam,
      ...newExam,
      startDate: newExam.startDate.toISOString(),
      endDate: newExam.endDate.toISOString(),
      questions: sampleQuestions.slice(0, 4) // Keep existing questions for now
    };
    
    setExams(exams.map(exam => exam.id === selectedExam.id ? updatedExam : exam));
    setShowEditDialog(false);
    setCurrentStep(1);
    setSelectedExam(null);
    
    toast({
      title: 'Exam Updated',
      description: 'Exam has been updated successfully.',
    });
  };

  const handleDeleteExam = (examId: string) => {
    setExams(exams.filter(exam => exam.id !== examId));
    toast({
      title: 'Exam Deleted',
      description: 'Exam has been deleted successfully.',
      variant: 'destructive'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {newExam.startDate ? format(newExam.startDate, "PPP") : "Pick start date"}
                      </span>
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
                      <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {newExam.endDate ? format(newExam.endDate, "PPP") : "Pick end date"}
                      </span>
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
        
        <Button className="bg-gradient-primary" onClick={handleCreateExam}>
          <Plus className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
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
      
      {/* View Exam Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Exam Details</DialogTitle>
            <DialogDescription>
              Complete details of the selected examination
            </DialogDescription>
          </DialogHeader>
          
          {selectedExam && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                    <p className="text-lg font-semibold">{selectedExam.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Subject</Label>
                    <p>{selectedExam.subject}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="text-sm">{selectedExam.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                      <p>{selectedExam.duration} minutes</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Total Marks</Label>
                      <p>{selectedExam.totalMarks}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Passing Marks</Label>
                      <p>{selectedExam.passingMarks}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                      <Badge className={`${getStatusColor(selectedExam.status)} text-white`}>
                        {getStatusIcon(selectedExam.status)}
                        <span className="ml-1 capitalize">{selectedExam.status}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Start Date</Label>
                  <p>{format(new Date(selectedExam.startDate), 'PPP p')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">End Date</Label>
                  <p>{format(new Date(selectedExam.endDate), 'PPP p')}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">Settings</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Proctoring: {selectedExam.proctoringEnabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    <span>Randomize: {selectedExam.randomizeQuestions !== false ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">Questions ({selectedExam.questions.length})</Label>
                <div className="max-h-40 overflow-y-auto border rounded-md p-4">
                  {selectedExam.questions.map((question: any, index: number) => (
                    <div key={question.id} className="mb-2 last:mb-0">
                      <p className="text-sm font-medium">Q{index + 1}: {question.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground">Assigned Candidates ({selectedExam.assignedCandidates.length})</Label>
                <div className="max-h-40 overflow-y-auto border rounded-md p-4">
                  {selectedExam.assignedCandidates.map((candidateId: string) => {
                    const candidate = candidates.find(c => c.id === candidateId);
                    return candidate ? (
                      <div key={candidateId} className="mb-2 last:mb-0">
                        <p className="text-sm">{candidate.name} ({candidate.email})</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Exam Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>Edit Exam</DialogTitle>
            <DialogDescription>
              Modify the examination settings and configuration
            </DialogDescription>
          </DialogHeader>
          
          {/* Wizard Steps */}
          <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
            <div className="flex items-center min-w-max">
              {wizardSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : currentStep > step.id
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <step.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </div>
                  <div className="ml-2 hidden lg:block">
                    <p className="text-xs sm:text-sm font-medium whitespace-nowrap">{step.title}</p>
                  </div>
                  {index < wizardSteps.length - 1 && (
                    <div className="w-8 sm:w-12 h-0.5 bg-border mx-2 sm:mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Step Content */}
          <div className="min-h-[300px]">
            {renderWizardStep()}
          </div>
          
          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="w-full sm:w-auto"
            >
              Previous
            </Button>
            
            <div className="flex gap-2 w-full sm:w-auto">
              {currentStep < 5 ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  className="bg-gradient-primary flex-1 sm:flex-none"
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleUpdateExam} className="bg-gradient-primary flex-1 sm:flex-none">
                  Update Exam
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
            <DialogHeader>
              <DialogTitle>View Exam Details</DialogTitle>
              <DialogDescription>
                Complete details of the selected examination
              </DialogDescription>
            </DialogHeader>
            
            {selectedExam && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                      <p className="text-lg font-semibold">{selectedExam.title}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Subject</Label>
                      <p>{selectedExam.subject}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                      <p className="text-sm">{selectedExam.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                        <p>{selectedExam.duration} minutes</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Total Marks</Label>
                        <p>{selectedExam.totalMarks}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Passing Marks</Label>
                        <p>{selectedExam.passingMarks}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                        <Badge className={`${getStatusColor(selectedExam.status)} text-white`}>
                          {getStatusIcon(selectedExam.status)}
                          <span className="ml-1 capitalize">{selectedExam.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Start Date</Label>
                    <p>{format(new Date(selectedExam.startDate), 'PPP p')}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">End Date</Label>
                    <p>{format(new Date(selectedExam.endDate), 'PPP p')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-muted-foreground">Settings</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Proctoring: {selectedExam.proctoringEnabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      <span>Randomize: {selectedExam.randomizeQuestions !== false ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-muted-foreground">Questions ({selectedExam.questions.length})</Label>
                  <div className="max-h-40 overflow-y-auto border rounded-md p-4">
                    {selectedExam.questions.map((question: any, index: number) => (
                      <div key={question.id} className="mb-2 last:mb-0">
                        <p className="text-sm font-medium">Q{index + 1}: {question.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-muted-foreground">Assigned Candidates ({selectedExam.assignedCandidates.length})</Label>
                  <div className="max-h-40 overflow-y-auto border rounded-md p-4">
                    {selectedExam.assignedCandidates.map((candidateId: string) => {
                      const candidate = candidates.find(c => c.id === candidateId);
                      return candidate ? (
                        <div key={candidateId} className="mb-2 last:mb-0">
                          <p className="text-sm">{candidate.name} ({candidate.email})</p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Edit Exam Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
            <DialogHeader>
              <DialogTitle>Edit Exam</DialogTitle>
              <DialogDescription>
                Modify the examination settings and configuration
              </DialogDescription>
            </DialogHeader>
            
            {/* Wizard Steps */}
            <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
              <div className="flex items-center min-w-max">
                {wizardSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                        currentStep === step.id
                          ? 'bg-primary text-primary-foreground'
                          : currentStep > step.id
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <step.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </div>
                    <div className="ml-2 hidden lg:block">
                      <p className="text-xs sm:text-sm font-medium whitespace-nowrap">{step.title}</p>
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className="w-8 sm:w-12 h-0.5 bg-border mx-2 sm:mx-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Step Content */}
            <div className="min-h-[300px]">
              {renderWizardStep()}
            </div>
            
            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>
              
              <div className="flex gap-2 w-full sm:w-auto">
                {currentStep < 5 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                    className="bg-gradient-primary flex-1 sm:flex-none"
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleUpdateExam} className="bg-gradient-primary flex-1 sm:flex-none">
                    Update Exam
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover-scale"
                    onClick={() => handleViewExam(exam)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover-scale"
                    onClick={() => handleEditExam(exam)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover-scale text-destructive hover:text-destructive"
                    onClick={() => handleDeleteExam(exam.id)}
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