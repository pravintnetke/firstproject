import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Search, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Users,
  Mail,
  Phone,
  UserPlus,
  FileSpreadsheet
} from 'lucide-react';
import { sampleUsers } from '@/data/sampleData';
import { toast } from '@/hooks/use-toast';

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState(
    sampleUsers.filter(u => u.role === 'candidate')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    batch: ''
  });

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCandidate = () => {
    const candidate = {
      id: `${candidates.length + 1}`,
      ...newCandidate,
      role: 'candidate' as const,
      createdAt: new Date().toISOString()
    };
    
    setCandidates([...candidates, candidate]);
    setShowAddDialog(false);
    setNewCandidate({ name: '', email: '', phone: '', batch: '' });
    
    toast({
      title: 'Candidate Added',
      description: 'New candidate has been added successfully.',
    });
  };

  const handleDeleteCandidate = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
    toast({
      title: 'Candidate Removed',
      description: 'Candidate has been removed from the system.',
    });
  };

  const handleBulkUpload = () => {
    toast({
      title: 'Bulk Upload',
      description: 'Excel file upload functionality would be implemented here.',
    });
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Candidate Management</h1>
          <p className="text-muted-foreground">
            Manage student registrations and exam assignments
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Candidate</DialogTitle>
                <DialogDescription>
                  Add a new student to the examination system
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@student.edu"
                    value={newCandidate.email}
                    onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={newCandidate.phone}
                    onChange={(e) => setNewCandidate({...newCandidate, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch</Label>
                  <Select value={newCandidate.batch} onValueChange={(value) => setNewCandidate({...newCandidate, batch: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs-2024">Computer Science 2024</SelectItem>
                      <SelectItem value="bio-2024">Biology Honors 2024</SelectItem>
                      <SelectItem value="math-2024">Mathematics 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCandidate} className="bg-gradient-primary">
                    Add Candidate
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
                <p className="text-sm text-muted-foreground">Total Candidates</p>
                <p className="text-2xl font-bold">{candidates.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">{candidates.length}</p>
              </div>
              <UserPlus className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Mail className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold">{candidates.length - 1}</p>
              </div>
              <Badge className="bg-success">
                98%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Batches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="cs-2024">Computer Science 2024</SelectItem>
                <SelectItem value="bio-2024">Biology Honors 2024</SelectItem>
                <SelectItem value="math-2024">Mathematics 2024</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="grid gap-4">
        {filteredCandidates.map((candidate, index) => (
          <Card key={candidate.id} className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{candidate.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{candidate.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>+1 (555) 123-456{index}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Computer Science 2024</Badge>
                      <Badge className="bg-success">Verified</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Registered: {new Date(candidate.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm font-medium">
                      3 Exams Assigned
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hover-scale">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteCandidate(candidate.id)}
                      className="hover-scale text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Candidates Found</h3>
            <p className="text-muted-foreground mb-4">
              No candidates match your search criteria.
            </p>
            <Button onClick={() => setShowAddDialog(true)} className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add First Candidate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}