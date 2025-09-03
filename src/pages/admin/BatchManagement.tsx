import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Search, 
  Users, 
  Edit, 
  Trash2, 
  UserPlus,
  GraduationCap,
  Calendar,
  BookOpen,
  Eye,
  Download
} from 'lucide-react';
import { sampleBatches, sampleUsers, sampleExams } from '@/data/sampleData';
import { toast } from '@/hooks/use-toast';

export default function BatchManagement() {
  const [batches, setBatches] = useState(sampleBatches);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [newBatch, setNewBatch] = useState({
    name: '',
    description: '',
    course: '',
    academic_year: '2024-25',
    candidates: [] as string[]
  });

  const candidates = sampleUsers.filter(u => u.role === 'candidate');
  const availableCandidates = candidates.filter(c => 
    !batches.some(b => b.candidates.includes(c.id))
  );

  const filteredBatches = batches.filter(batch => 
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBatch = () => {
    const batch = {
      id: `b${batches.length + 1}`,
      ...newBatch,
      createdAt: new Date().toISOString()
    };
    
    setBatches([...batches, batch]);
    setShowCreateDialog(false);
    setNewBatch({
      name: '',
      description: '',
      course: '',
      academic_year: '2024-25',
      candidates: []
    });
    
    toast({
      title: 'Batch Created',
      description: 'New batch has been created successfully.',
    });
  };

  const handleDeleteBatch = (id: string) => {
    setBatches(batches.filter(b => b.id !== id));
    toast({
      title: 'Batch Deleted',
      description: 'Batch has been removed from the system.',
    });
  };

  const handleAssignCandidates = (batchId: string, candidateIds: string[]) => {
    setBatches(batches.map(batch => 
      batch.id === batchId 
        ? { ...batch, candidates: [...new Set([...batch.candidates, ...candidateIds])] }
        : batch
    ));
    
    toast({
      title: 'Candidates Assigned',
      description: `${candidateIds.length} candidates assigned to batch.`,
    });
  };

  const getBatchStats = (batch: any) => {
    const assignedExams = sampleExams.filter(exam => 
      exam.assignedCandidates.some(candidateId => batch.candidates.includes(candidateId))
    );
    
    return {
      totalCandidates: batch.candidates.length,
      assignedExams: assignedExams.length,
      activeExams: assignedExams.filter(exam => exam.status === 'published').length
    };
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Batch Management</h1>
          <p className="text-muted-foreground">
            Organize students into batches for efficient exam management
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Create Batch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Batch</DialogTitle>
                <DialogDescription>
                  Create a new student batch for organizing examinations
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Batch Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Computer Science Batch 2024"
                    value={newBatch.name}
                    onChange={(e) => setNewBatch({...newBatch, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select value={newBatch.course} onValueChange={(value) => setNewBatch({...newBatch, course: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B.Tech Computer Science">B.Tech Computer Science</SelectItem>
                        <SelectItem value="B.Tech Electrical Engineering">B.Tech Electrical Engineering</SelectItem>
                        <SelectItem value="M.Tech">M.Tech</SelectItem>
                        <SelectItem value="MBA">MBA</SelectItem>
                        <SelectItem value="JEE Preparation">JEE Preparation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="academic_year">Academic Year</Label>
                    <Select value={newBatch.academic_year} onValueChange={(value) => setNewBatch({...newBatch, academic_year: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2025-26">2025-26</SelectItem>
                        <SelectItem value="2026-27">2026-27</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the batch purpose and characteristics..."
                    value={newBatch.description}
                    onChange={(e) => setNewBatch({...newBatch, description: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateBatch} className="bg-gradient-primary">
                    Create Batch
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Batches</p>
                <p className="text-2xl font-bold">{batches.length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">
                  {batches.reduce((sum, batch) => sum + batch.candidates.length, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unassigned</p>
                <p className="text-2xl font-bold">{availableCandidates.length}</p>
              </div>
              <UserPlus className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Batch Size</p>
                <p className="text-2xl font-bold">
                  {batches.length > 0 
                    ? Math.round(batches.reduce((sum, batch) => sum + batch.candidates.length, 0) / batches.length)
                    : 0}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search batches by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Batches List */}
      <div className="grid gap-4">
        {filteredBatches.map((batch) => {
          const stats = getBatchStats(batch);
          const batchCandidates = candidates.filter(c => batch.candidates.includes(c.id));
          
          return (
            <Card key={batch.id} className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{batch.name}</h3>
                    <p className="text-muted-foreground">{batch.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{batch.course}</Badge>
                      <Badge variant="secondary">{batch.academic_year}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog open={showAssignDialog && selectedBatch === batch.id} onOpenChange={(open) => {
                      setShowAssignDialog(open);
                      if (!open) setSelectedBatch(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedBatch(batch.id)}
                        >
                          <UserPlus className="mr-1 h-3 w-3" />
                          Assign
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Candidates to {batch.name}</DialogTitle>
                          <DialogDescription>
                            Select candidates to add to this batch
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 max-h-60 overflow-y-auto">
                          {availableCandidates.map((candidate) => (
                            <div key={candidate.id} className="flex items-center space-x-2">
                              <Checkbox id={`assign-${candidate.id}`} />
                              <Label htmlFor={`assign-${candidate.id}`} className="flex-1">
                                {candidate.name} ({candidate.email})
                              </Label>
                            </div>
                          ))}
                          {availableCandidates.length === 0 && (
                            <p className="text-center text-muted-foreground py-4">
                              No unassigned candidates available
                            </p>
                          )}
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4">
                          <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => {
                            handleAssignCandidates(batch.id, []);
                            setShowAssignDialog(false);
                          }}>
                            Assign Selected
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm" className="hover-scale">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="hover-scale">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteBatch(batch.id)}
                      className="hover-scale text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{stats.totalCandidates} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{stats.assignedExams} exams assigned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-success" />
                    <span className="text-sm">{stats.activeExams} active exams</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Students in this batch:</p>
                  <div className="flex flex-wrap gap-2">
                    {batchCandidates.slice(0, 5).map((candidate) => (
                      <Badge key={candidate.id} variant="outline">
                        {candidate.name}
                      </Badge>
                    ))}
                    {batchCandidates.length > 5 && (
                      <Badge variant="outline">
                        +{batchCandidates.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                  Created: {new Date(batch.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {filteredBatches.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Batches Found</h3>
            <p className="text-muted-foreground mb-4">
              Create your first batch to organize students for examinations.
            </p>
            <Button onClick={() => setShowCreateDialog(true)} className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Create First Batch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}