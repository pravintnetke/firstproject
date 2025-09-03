import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ArrowLeft,
  ArrowRight,
  Settings,
  Edit,
  Shield,
  Calendar as CalendarIcon,
  Users,
  CheckCircle,
  Save,
  Plus,
  Search
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { sampleUsers, sampleQuestions } from '@/data/sampleData';
import { toast } from '@/hooks/use-toast';

export default function CreateExam() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showQuestionBankDialog, setShowQuestionBankDialog] = useState(false);
  const [showCreateQuestionDialog, setShowCreateQuestionDialog] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'multiple-choice' as const,
    options: ['', '', '', ''],
    correctAnswer: 0,
    marks: 1,
    difficulty: 'medium' as const
  });
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

  const wizardSteps = [
    { id: 1, title: 'General Settings', icon: Settings },
    { id: 2, title: 'Question Pool', icon: Edit },
    { id: 3, title: 'Proctoring & Security', icon: Shield },
    { id: 4, title: 'Scheduling', icon: CalendarIcon },
    { id: 5, title: 'Assignment', icon: Users }
  ];

  const handleBrowseQuestionBank = () => {
    setSelectedQuestions(newExam.questions);
    setShowQuestionBankDialog(true);
  };

  const handleCreateNewQuestion = () => {
    setNewQuestion({
      text: '',
      type: 'multiple-choice' as const,
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 1,
      difficulty: 'medium' as const
    });
    setShowCreateQuestionDialog(true);
  };

  const handleSaveQuestion = () => {
    // In a real app, this would save to backend
    const questionId = `q${Date.now()}`;
    console.log('Creating question:', { id: questionId, ...newQuestion });
    
    // Add to selected questions
    setSelectedQuestions([...selectedQuestions, questionId]);
    setNewExam({...newExam, questions: [...selectedQuestions, questionId]});
    
    setShowCreateQuestionDialog(false);
    toast({
      title: 'Question Created',
      description: 'New question has been added to the exam.',
    });
  };

  const handleSelectQuestions = () => {
    setNewExam({...newExam, questions: selectedQuestions});
    setShowQuestionBankDialog(false);
    toast({
      title: 'Questions Selected',
      description: `${selectedQuestions.length} questions added to the exam.`,
    });
  };

  const handleCreateExam = () => {
    const exam = {
      id: `e${Date.now()}`,
      ...newExam,
      status: 'draft' as const,
      startDate: newExam.startDate.toISOString(),
      endDate: newExam.endDate.toISOString(),
      questions: sampleQuestions.slice(0, 4), // Sample questions
      examType: 'semester' as const
    };
    
    // In a real app, this would save to backend
    console.log('Creating exam:', exam);
    
    toast({
      title: 'Exam Created',
      description: 'New exam has been created successfully.',
    });
    
    navigate('/admin/exams');
  };

  const renderWizardStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure the basic information and settings for your exam
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  rows={4}
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
            </CardContent>
          </Card>
        );
      
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Question Pool
              </CardTitle>
              <CardDescription>
                Select questions from your question bank or create new ones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Edit className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-xl font-medium mb-4">Question Pool Setup</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Select questions from your question bank or create new ones for this exam
                </p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="bg-primary/10 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium">4 questions selected</span>
                  </div>
                  <div className="bg-secondary px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium">Mixed difficulties</span>
                  </div>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={handleBrowseQuestionBank}>
                    <Search className="h-4 w-4 mr-2" />
                    Browse Question Bank
                  </Button>
                  <Button onClick={handleCreateNewQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Proctoring & Security
              </CardTitle>
              <CardDescription>
                Configure monitoring and security features for the exam
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium">Enable Proctoring</h3>
                  <p className="text-sm text-muted-foreground">Monitor students during the exam</p>
                </div>
                <Switch
                  checked={newExam.proctoringEnabled}
                  onCheckedChange={(checked) => setNewExam({...newExam, proctoringEnabled: checked})}
                />
              </div>
              
              {newExam.proctoringEnabled && (
                <div className="space-y-4 pl-6 border-l-2 border-primary/20">
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
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label>Randomize Questions</Label>
                    <p className="text-sm text-muted-foreground">Shuffle question order for each student</p>
                  </div>
                  <Switch
                    checked={newExam.randomizeQuestions}
                    onCheckedChange={(checked) => setNewExam({...newExam, randomizeQuestions: checked})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label>Negative Marking</Label>
                    <p className="text-sm text-muted-foreground">Deduct marks for incorrect answers</p>
                  </div>
                  <Switch
                    checked={newExam.negativeMarking}
                    onCheckedChange={(checked) => setNewExam({...newExam, negativeMarking: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Scheduling
              </CardTitle>
              <CardDescription>
                Set the exam date, time, and availability window
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Exam Window
                </h4>
                <p className="text-sm text-muted-foreground">
                  Students can start the exam anytime within this window. Once started, they'll have {newExam.duration} minutes to complete it.
                </p>
              </div>
            </CardContent>
          </Card>
        );
        
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Assignment
              </CardTitle>
              <CardDescription>
                Assign the exam to specific candidates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Candidates</Label>
                <div className="max-h-80 overflow-y-auto border rounded-md">
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center space-x-3 p-4 border-b last:border-b-0 hover:bg-muted/50">
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
                      <div className="flex-1">
                        <Label htmlFor={`candidate-${candidate.id}`} className="cursor-pointer font-medium">
                          {candidate.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 bg-primary/5 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Assignment Summary
                </h4>
                <p className="text-sm text-muted-foreground">
                  {newExam.assignedCandidates.length} candidates will be notified via email and SMS with login credentials.
                </p>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/admin/exams')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Exams
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Create New Exam</h1>
                <p className="text-muted-foreground">Follow the 5-step wizard to set up your examination</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/admin/exams')}>
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
            <div className="flex items-center min-w-max">
              {wizardSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : currentStep > step.id
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className="text-sm font-medium whitespace-nowrap">{step.title}</p>
                  </div>
                  {index < wizardSteps.length - 1 && (
                    <div className="w-16 h-0.5 bg-border mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderWizardStep()}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin/exams')}>
              Save as Draft
            </Button>
            {currentStep < 5 ? (
              <Button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                className="bg-gradient-primary flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleCreateExam} 
                className="bg-gradient-primary flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Create Exam
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Browse Question Bank Dialog */}
      <Dialog open={showQuestionBankDialog} onOpenChange={setShowQuestionBankDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Browse Question Bank</DialogTitle>
            <DialogDescription>
              Select questions from your question bank to add to this exam
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search questions..." className="pl-8" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
            
            <div className="max-h-96 overflow-y-auto space-y-2">
              {sampleQuestions.map((question) => (
                <div key={question.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                  <input
                    type="checkbox"
                    id={`question-${question.id}`}
                    className="mt-1"
                    checked={selectedQuestions.includes(question.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedQuestions([...selectedQuestions, question.id]);
                      } else {
                        setSelectedQuestions(selectedQuestions.filter(id => id !== question.id));
                      }
                    }}
                  />
                  <div className="flex-1">
                    <Label htmlFor={`question-${question.id}`} className="cursor-pointer font-medium">
                      {question.text}
                    </Label>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <span className="bg-primary/10 px-2 py-1 rounded text-xs">
                        {question.difficulty}
                      </span>
                      <span>{question.marks} marks</span>
                      <span>{question.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                {selectedQuestions.length} questions selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowQuestionBankDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSelectQuestions}>
                  Add Selected Questions
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create New Question Dialog */}
      <Dialog open={showCreateQuestionDialog} onOpenChange={setShowCreateQuestionDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Question</DialogTitle>
            <DialogDescription>
              Add a new question to your question bank and this exam
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="questionText">Question Text</Label>
              <Textarea
                id="questionText"
                placeholder="Enter your question here..."
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="questionType">Question Type</Label>
                <select
                  id="questionType"
                  className="w-full p-2 border rounded-md"
                  value={newQuestion.type}
                  onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value as any})}
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="short-answer">Short Answer</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <select
                  id="difficulty"
                  className="w-full p-2 border rounded-md"
                  value={newQuestion.difficulty}
                  onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value as any})}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            
            {newQuestion.type === 'multiple-choice' && (
              <div className="space-y-4">
                <Label>Answer Options</Label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={newQuestion.correctAnswer === index}
                      onChange={() => setNewQuestion({...newQuestion, correctAnswer: index})}
                    />
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion({...newQuestion, options: newOptions});
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="marks">Marks</Label>
              <Input
                id="marks"
                type="number"
                min="1"
                value={newQuestion.marks}
                onChange={(e) => setNewQuestion({...newQuestion, marks: parseInt(e.target.value)})}
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowCreateQuestionDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveQuestion} disabled={!newQuestion.text.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Save Question
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
