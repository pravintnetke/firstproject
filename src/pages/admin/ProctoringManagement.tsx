import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  Camera, 
  Mic, 
  Monitor, 
  AlertTriangle, 
  Eye, 
  Download,
  Play,
  Pause,
  Settings,
  Search,
  Filter,
  Users,
  Clock,
  TrendingUp,
  FileText
} from 'lucide-react';
import { sampleExams, sampleUsers, sampleResults } from '@/data/sampleData';

export default function ProctoringManagement() {
  const [selectedTab, setSelectedTab] = useState('violations');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  
  // Mock proctoring data
  const violations = [
    {
      id: 'v1',
      candidateId: '2',
      candidateName: 'John Smith',
      examId: 'e1',
      examTitle: 'General Knowledge Assessment',
      type: 'tab_switch',
      severity: 'high',
      timestamp: '2024-03-01T10:15:00Z',
      description: 'Candidate switched to another tab during exam',
      duration: 5,
      status: 'flagged'
    },
    {
      id: 'v2',
      candidateId: '3',
      candidateName: 'Emily Davis',
      examId: 'e1',
      examTitle: 'General Knowledge Assessment',
      type: 'face_not_detected',
      severity: 'medium',
      timestamp: '2024-03-01T11:05:00Z',
      description: 'Face not detected for extended period',
      duration: 30,
      status: 'reviewed'
    },
    {
      id: 'v3',
      candidateId: '4',
      candidateName: 'Michael Brown',
      examId: 'e1',
      examTitle: 'General Knowledge Assessment',
      type: 'multiple_faces',
      severity: 'high',
      timestamp: '2024-03-01T09:45:00Z',
      description: 'Multiple faces detected in camera feed',
      duration: 15,
      status: 'flagged'
    },
    {
      id: 'v4',
      candidateId: '2',
      candidateName: 'John Smith',
      examId: 'e1',
      examTitle: 'General Knowledge Assessment',
      type: 'suspicious_activity',
      severity: 'low',
      timestamp: '2024-03-01T10:30:00Z',
      description: 'Unusual head movements detected',
      duration: 8,
      status: 'dismissed'
    }
  ];

  const activeMonitoring = [
    {
      examId: 'e1',
      examTitle: 'Final Mathematics Exam',
      candidates: 15,
      violations: 3,
      startTime: '2024-03-15T09:00:00Z',
      duration: 120,
      status: 'active'
    },
    {
      examId: 'e2',
      examTitle: 'Physics Lab Assessment',
      candidates: 8,
      violations: 1,
      startTime: '2024-03-15T14:00:00Z',
      duration: 90,
      status: 'active'
    }
  ];

  const proctoringSettings = {
    faceDetection: true,
    tabSwitchDetection: true,
    screenRecording: true,
    audioMonitoring: false,
    chatDetection: true,
    cellPhoneDetection: false,
    violationThreshold: 3,
    autoFlag: true
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'flagged': return 'text-destructive';
      case 'reviewed': return 'text-warning';
      case 'dismissed': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getViolationIcon = (type: string) => {
    switch (type) {
      case 'tab_switch': return <Monitor className="h-4 w-4" />;
      case 'face_not_detected': return <Camera className="h-4 w-4" />;
      case 'multiple_faces': return <Users className="h-4 w-4" />;
      case 'suspicious_activity': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const filteredViolations = violations.filter(violation => {
    return (
      (searchTerm === '' || 
       violation.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       violation.examTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSeverity === 'all' || violation.severity === selectedSeverity)
    );
  });

  const stats = {
    totalViolations: violations.length,
    highSeverity: violations.filter(v => v.severity === 'high').length,
    activeExams: activeMonitoring.length,
    candidatesMonitored: activeMonitoring.reduce((sum, exam) => sum + exam.candidates, 0)
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Proctoring Management</h1>
          <p className="text-muted-foreground">
            Monitor exam security and manage proctoring violations
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Violations</p>
                <p className="text-2xl font-bold">{stats.totalViolations}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Severity</p>
                <p className="text-2xl font-bold text-destructive">{stats.highSeverity}</p>
              </div>
              <Shield className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Exams</p>
                <p className="text-2xl font-bold text-success">{stats.activeExams}</p>
              </div>
              <Monitor className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monitored</p>
                <p className="text-2xl font-bold">{stats.candidatesMonitored}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="active">Live Monitoring</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="violations" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by candidate or exam..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Severities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Violations List */}
          <div className="space-y-4">
            {filteredViolations.map(violation => (
              <Card key={violation.id} className="dashboard-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {getViolationIcon(violation.type)}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{violation.candidateName}</h3>
                          <Badge className={`${getSeverityColor(violation.severity)} text-white`}>
                            {violation.severity.toUpperCase()}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(violation.status)}
                          >
                            {violation.status}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm">
                          <strong>Exam:</strong> {violation.examTitle}
                        </p>
                        
                        <p className="text-sm">{violation.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(violation.timestamp).toLocaleString()}</span>
                          </div>
                          <span>Duration: {violation.duration}s</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        Review
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="mr-1 h-3 w-3" />
                        Playback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="space-y-4">
            {activeMonitoring.map(exam => (
              <Card key={exam.examId} className="dashboard-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{exam.examTitle}</h3>
                      <p className="text-sm text-muted-foreground">
                        Started: {new Date(exam.startTime).toLocaleString()}
                      </p>
                    </div>
                    
                    <Badge className="bg-success animate-pulse">
                      <Play className="mr-1 h-3 w-3" />
                      LIVE
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">{exam.candidates}</div>
                      <div className="text-xs text-muted-foreground">Candidates</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-warning">{exam.violations}</div>
                      <div className="text-xs text-muted-foreground">Violations</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">{exam.duration}m</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-success">85%</div>
                      <div className="text-xs text-muted-foreground">Completion</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Progress value={85} className="flex-1 mr-4" />
                    <Button variant="outline" size="sm">
                      <Monitor className="mr-1 h-3 w-3" />
                      Monitor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {activeMonitoring.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Active Exams</h3>
                  <p className="text-muted-foreground">
                    There are no exams currently being monitored.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proctoring Configuration</CardTitle>
              <CardDescription>
                Configure monitoring features and violation detection settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Detection Features</h4>
                  
                  <div className="space-y-3">
                    {[
                      { key: 'faceDetection', label: 'Face Detection', icon: Camera },
                      { key: 'tabSwitchDetection', label: 'Tab Switch Detection', icon: Monitor },
                      { key: 'screenRecording', label: 'Screen Recording', icon: FileText },
                      { key: 'audioMonitoring', label: 'Audio Monitoring', icon: Mic },
                      { key: 'chatDetection', label: 'Chat Detection', icon: Users },
                      { key: 'cellPhoneDetection', label: 'Cell Phone Detection', icon: Shield }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{label}</span>
                        </div>
                        <Badge 
                          variant={proctoringSettings[key as keyof typeof proctoringSettings] ? 'default' : 'outline'}
                          className={proctoringSettings[key as keyof typeof proctoringSettings] ? 'bg-success' : ''}
                        >
                          {proctoringSettings[key as keyof typeof proctoringSettings] ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Violation Thresholds</h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <label className="text-sm font-medium">Auto-flag threshold</label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Automatically flag candidates after this many violations
                      </p>
                      <Input type="number" value={3} className="w-24" />
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <label className="text-sm font-medium">Face detection sensitivity</label>
                      <p className="text-xs text-muted-foreground mb-2">
                        How sensitive face detection should be
                      </p>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <label className="text-sm font-medium">Recording quality</label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Video recording resolution
                      </p>
                      <Select defaultValue="720p">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="480p">480p</SelectItem>
                          <SelectItem value="720p">720p</SelectItem>
                          <SelectItem value="1080p">1080p</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-gradient-primary">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Violation Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center space-y-2">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Violation trends chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Violation Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: 'Tab Switch', count: 15, percentage: 45 },
                  { type: 'Face Not Detected', count: 8, percentage: 24 },
                  { type: 'Multiple Faces', count: 6, percentage: 18 },
                  { type: 'Suspicious Activity', count: 4, percentage: 13 }
                ].map((item) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.type}</span>
                      <span>{item.count} incidents</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}