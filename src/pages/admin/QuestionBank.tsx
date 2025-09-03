import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Upload, 
  Download,
  FileText,
  Image,
  Video,
  Mic
} from 'lucide-react';
import { sampleQuestions } from '@/data/sampleData';
import { toast } from '@/hooks/use-toast';

export default function QuestionBank() {
  const [questions, setQuestions] = useState(sampleQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'mcq' as 'mcq' | 'subjective' | 'true-false',
    subject: '',
    topic: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    options: ['', '', '', ''],
    correctAnswer: 0,
    marks: 1,
    negativeMarks: 0,
    explanation: ''
  });

  const subjects = [...new Set(questions.map(q => q.subject))];
  const filteredQuestions = questions.filter(q => {
    return (
      (searchTerm === '' || q.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
       q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
       q.topic.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSubject === 'all' || q.subject === selectedSubject) &&
      (selectedDifficulty === 'all' || q.difficulty === selectedDifficulty)
    );
  });

  const handleAddQuestion = () => {
    const question = {
      id: `q${questions.length + 1}`,
      ...newQuestion,
      options: newQuestion.type === 'subjective' ? undefined : newQuestion.options.filter(opt => opt.trim() !== '')
    };
    
    setQuestions([...questions, question]);
    setShowAddDialog(false);
    setNewQuestion({
      text: '',
      type: 'mcq',
      subject: '',
      topic: '',
      difficulty: 'medium',
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 1,
      negativeMarks: 0,
      explanation: ''
    });
    
    toast({
      title: 'Question Added',
      description: 'New question has been added to the question bank.',
    });
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({
      title: 'Question Deleted',
      description: 'Question has been removed from the question bank.',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'hard': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mcq': return <FileText className="h-4 w-4" />;
      case 'subjective': return <Edit className="h-4 w-4" />;
      case 'true-false': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Bank</h1>
          <p className="text-muted-foreground">
            Manage your exam questions organized by subject and difficulty
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Excel
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Question</DialogTitle>
                <DialogDescription>
                  Create a new question for your question bank
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Mathematics"
                      value={newQuestion.subject}
                      onChange={(e) => setNewQuestion({...newQuestion, subject: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Algebra"
                      value={newQuestion.topic}
                      onChange={(e) => setNewQuestion({...newQuestion, topic: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select value={newQuestion.type} onValueChange={(value: any) => setNewQuestion({...newQuestion, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                        <SelectItem value="subjective">Subjective</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select value={newQuestion.difficulty} onValueChange={(value: any) => setNewQuestion({...newQuestion, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="question-text">Question Text</Label>
                  <Textarea
                    id="question-text"
                    placeholder="Enter your question here..."
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                
                {(newQuestion.type === 'mcq' || newQuestion.type === 'true-false') && (
                  <div className="space-y-4">
                    <Label>Answer Options</Label>
                    {newQuestion.type === 'true-false' ? (
                      <RadioGroup 
                        value={newQuestion.correctAnswer.toString()} 
                        onValueChange={(value) => setNewQuestion({...newQuestion, correctAnswer: parseInt(value)})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="true" />
                          <Label htmlFor="true">True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="false" />
                          <Label htmlFor="false">False</Label>
                        </div>
                      </RadioGroup>
                    ) : (
                      <div className="space-y-2">
                        {newQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <RadioGroup
                              value={newQuestion.correctAnswer.toString()}
                              onValueChange={(value) => setNewQuestion({...newQuestion, correctAnswer: parseInt(value)})}
                            >
                              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            </RadioGroup>
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
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="explanation">Explanation (Optional)</Label>
                  <Textarea
                    id="explanation"
                    placeholder="Provide an explanation for the correct answer..."
                    value={newQuestion.explanation}
                    onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddQuestion} className="bg-gradient-primary">
                    Add Question
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold">{questions.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subjects</p>
                <p className="text-2xl font-bold">{subjects.length}</p>
              </div>
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">MCQ Questions</p>
                <p className="text-2xl font-bold">{questions.filter(q => q.type === 'mcq').length}</p>
              </div>
              <Video className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subjective</p>
                <p className="text-2xl font-bold">{questions.filter(q => q.type === 'subjective').length}</p>
              </div>
              <Mic className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => (
          <Card key={question.id} className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(question.type)}
                    <Badge variant="outline" className="capitalize">
                      {question.type.replace('-', ' ')}
                    </Badge>
                    <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                      {question.difficulty}
                    </Badge>
                    <Badge variant="secondary">
                      {question.marks} marks
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-medium leading-relaxed">
                    {question.text}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span><strong>Subject:</strong> {question.subject}</span>
                    <span><strong>Topic:</strong> {question.topic}</span>
                    {question.negativeMarks && (
                      <span><strong>Negative:</strong> -{question.negativeMarks}</span>
                    )}
                  </div>
                  
                  {question.options && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {question.options.map((option, optIndex) => (
                        <div 
                          key={optIndex} 
                          className={`p-2 rounded border text-sm ${
                            question.correctAnswer === optIndex 
                              ? 'bg-success/10 border-success text-success-foreground' 
                              : 'bg-muted/50'
                          }`}
                        >
                          {optIndex + 1}. {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" className="hover-scale">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteQuestion(question.id)}
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
      
      {filteredQuestions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Questions Found</h3>
            <p className="text-muted-foreground mb-4">
              No questions match your current filters. Try adjusting your search criteria.
            </p>
            <Button onClick={() => setShowAddDialog(true)} className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add First Question
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}