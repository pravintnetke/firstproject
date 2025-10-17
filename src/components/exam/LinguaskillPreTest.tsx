import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle,
  Volume2, 
  Mic, 
  Play, 
  Square,
  RotateCcw,
  ChevronRight,
  User,
  FileText,
  Settings,
  BookOpen
} from 'lucide-react';
import { TestSession, EquipmentCheck, CandidateInfo } from '@/types/linguaskill';

interface LinguaskillPreTestProps {
  testSession: TestSession;
  onComplete: () => void;
}

export default function LinguaskillPreTest({ testSession, onComplete }: LinguaskillPreTestProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    nationality: '',
    nativeLanguage: '',
    testCenter: '',
    candidateNumber: '',
    additionalInfo: {}
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [equipmentChecks, setEquipmentChecks] = useState<EquipmentCheck[]>([
    { type: 'sound', status: 'not_tested' },
    { type: 'microphone', status: 'not_tested' }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>('');

  const steps = [
    { id: 'terms', title: 'Terms & Conditions', icon: FileText },
    { id: 'selection', title: 'Test Selection', icon: BookOpen },
    { id: 'info', title: 'Candidate Information', icon: User },
    { id: 'equipment', title: 'Equipment Check', icon: Settings },
    { id: 'instructions', title: 'Instructions', icon: BookOpen }
  ];

  const handleSoundTest = () => {
    setEquipmentChecks(prev => prev.map(check => 
      check.type === 'sound' 
        ? { ...check, status: 'testing' }
        : check
    ));

    // Create a test tone using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 800 Hz tone
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Low volume
      
      oscillator.start();
      
      // Play for 1 second
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
        
        setEquipmentChecks(prev => prev.map(check => 
          check.type === 'sound' 
            ? { ...check, status: 'passed', timestamp: new Date().toISOString() }
            : check
        ));
      }, 1000);
      
    } catch (error) {
      console.error('Sound test failed:', error);
      setEquipmentChecks(prev => prev.map(check => 
        check.type === 'sound' 
          ? { ...check, status: 'failed' }
          : check
      ));
    }
  };

  const handleMicrophoneTest = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);
        setEquipmentChecks(prev => prev.map(check => 
          check.type === 'microphone' 
            ? { ...check, status: 'testing' }
            : check
        ));

        // Create MediaRecorder to actually record audio
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          
          setEquipmentChecks(prev => prev.map(check => 
            check.type === 'microphone' 
              ? { ...check, status: 'passed', timestamp: new Date().toISOString() }
              : check
          ));
        };
        
        mediaRecorder.start();
        
        // Record for 3 seconds
        setTimeout(() => {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
        }, 3000);
        
      } catch (error) {
        console.error('Microphone test failed:', error);
        setIsRecording(false);
        setEquipmentChecks(prev => prev.map(check => 
          check.type === 'microphone' 
            ? { ...check, status: 'failed' }
            : check
        ));
      }
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return termsAccepted;
      case 1: return selectedModules.length > 0;
      case 2: return candidateInfo.firstName && candidateInfo.lastName && candidateInfo.email;
      case 3: return equipmentChecks.every(check => check.status === 'passed');
      case 4: return true;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Terms & Conditions
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4">Linguaskill Test Terms & Conditions</h3>
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto text-sm">
                <p className="mb-4">
                  <strong>1. Test Integrity:</strong> You must take this test independently without assistance from others or external resources.
                </p>
                <p className="mb-4">
                  <strong>2. Technical Requirements:</strong> Ensure you have a stable internet connection, working camera, and microphone.
                </p>
                <p className="mb-4">
                  <strong>3. Test Environment:</strong> Take the test in a quiet, well-lit room without interruptions.
                </p>
                <p className="mb-4">
                  <strong>4. Data Usage:</strong> Your responses, audio recordings, and test data will be processed for assessment purposes.
                </p>
                <p className="mb-4">
                  <strong>5. Time Limits:</strong> Each module has specific time limits that cannot be extended once started.
                </p>
                <p className="mb-4">
                  <strong>6. Results:</strong> Test results will be available within 48 hours of completion.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I have read and accept the terms and conditions
              </Label>
            </div>
          </div>
        );

      case 1: // Test Selection
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Test Modules</h3>
              <p className="text-gray-600 mb-6">Choose which skills you want to be assessed on:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'reading', name: 'Reading', duration: '59 min max', description: 'Adaptive test with various question types' },
                { id: 'listening', name: 'Listening', duration: '59 min max', description: 'Audio recordings played twice' },
                { id: 'writing', name: 'Writing', duration: '45 min', description: 'Single writing task' },
                { id: 'speaking', name: 'Speaking', duration: '16 min approx', description: '4 parts with recording' }
              ].map((module) => (
                <Card 
                  key={module.id}
                  className={`cursor-pointer transition-colors ${
                    selectedModules.includes(module.id) ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedModules(prev => 
                      prev.includes(module.id) 
                        ? prev.filter(m => m !== module.id)
                        : [...prev, module.id]
                    );
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{module.name}</h4>
                      <Badge variant="outline">{module.duration}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2: // Candidate Information
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Candidate Information</h3>
              <p className="text-gray-600 mb-6">Please verify and complete your registration information. Fields marked with * are required.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={candidateInfo.firstName}
                  onChange={(e) => setCandidateInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={candidateInfo.lastName}
                  onChange={(e) => setCandidateInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={candidateInfo.email}
                  onChange={(e) => setCandidateInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={candidateInfo.dateOfBirth}
                  onChange={(e) => setCandidateInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={candidateInfo.nationality}
                  onChange={(e) => setCandidateInfo(prev => ({ ...prev, nationality: e.target.value }))}
                  placeholder="Enter your nationality"
                />
              </div>
              <div>
                <Label htmlFor="nativeLanguage">Native Language</Label>
                <Input
                  id="nativeLanguage"
                  value={candidateInfo.nativeLanguage}
                  onChange={(e) => setCandidateInfo(prev => ({ ...prev, nativeLanguage: e.target.value }))}
                  placeholder="Enter your native language"
                />
              </div>
            </div>
          </div>
        );

      case 3: // Equipment Check
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Equipment Check</h3>
              <p className="text-gray-600 mb-4">Test your audio equipment to ensure optimal test experience.</p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> Make sure you have headphones connected and your microphone is working. 
                  Both tests must pass to continue.
                </p>
              </div>
            </div>
            
            {/* Sound Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Sound Test
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Click the button below to play a test sound. Adjust your volume until you can hear it clearly through your headphones.
                </p>
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={handleSoundTest} 
                    disabled={equipmentChecks[0].status === 'testing'}
                    variant={equipmentChecks[0].status === 'passed' ? 'outline' : 'default'}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {equipmentChecks[0].status === 'testing' ? 'Playing Test Tone...' : 
                     equipmentChecks[0].status === 'passed' ? 'Test Again' : 'Play Test Sound'}
                  </Button>
                  {equipmentChecks[0].status === 'passed' && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">✓ Sound test passed</span>
                    </div>
                  )}
                  {equipmentChecks[0].status === 'failed' && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">✗ Sound test failed - Check your speakers/headphones</span>
                    </div>
                  )}
                  {equipmentChecks[0].status === 'testing' && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span className="text-sm">Playing 800Hz test tone...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Microphone Test */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Microphone Test
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 font-medium">
                    📝 Please read this sentence clearly: <br />
                    <span className="text-base font-semibold">"Hello. I am taking a Speaking test on a computer"</span>
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <Button 
                    onClick={handleMicrophoneTest} 
                    disabled={equipmentChecks[1].status === 'testing'}
                    variant={isRecording ? 'destructive' : equipmentChecks[1].status === 'passed' ? 'outline' : 'default'}
                    size="lg"
                  >
                    {isRecording ? (
                      <>
                        <Square className="h-4 w-4 mr-2" />
                        Recording... (3s)
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        {equipmentChecks[1].status === 'passed' ? 'Record Again' : 'Start Recording'}
                      </>
                    )}
                  </Button>
                  
                  {equipmentChecks[1].status === 'passed' && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">✓ Microphone test passed</span>
                    </div>
                  )}
                  {equipmentChecks[1].status === 'failed' && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">✗ Microphone access denied or failed</span>
                    </div>
                  )}
                  {equipmentChecks[1].status === 'testing' && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="animate-pulse h-4 w-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Recording in progress...</span>
                    </div>
                  )}
                </div>
                {audioUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Playback your recording:</p>
                    <audio controls className="w-full">
                      <source src={audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Troubleshooting Tips */}
            {(equipmentChecks[0].status === 'failed' || equipmentChecks[1].status === 'failed') && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="h-5 w-5" />
                    Troubleshooting Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-orange-700">
                    {equipmentChecks[0].status === 'failed' && (
                      <div>
                        <p className="font-medium">Sound Test Failed:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Check if your speakers/headphones are connected</li>
                          <li>Increase your system volume</li>
                          <li>Try using different audio output device</li>
                          <li>Refresh the page and try again</li>
                        </ul>
                      </div>
                    )}
                    {equipmentChecks[1].status === 'failed' && (
                      <div>
                        <p className="font-medium">Microphone Test Failed:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Click "Allow" when browser asks for microphone permission</li>
                          <li>Check if your microphone is connected and not muted</li>
                          <li>Try using a different microphone or headset</li>
                          <li>Check browser settings for microphone access</li>
                          <li>Refresh the page and try again</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4: // Instructions
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Test Instructions</h3>
              <p className="text-gray-600 mb-6">Please read these important instructions before starting your test.</p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Navigation</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use the forward arrow to move to the next question</li>
                    <li>• You cannot return to previous questions in Reading, Listening, and Speaking tests</li>
                    <li>• A warning will appear if you try to skip a question</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Adaptive Testing</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Reading and Listening tests adapt to your performance</li>
                    <li>• The test ends when the system determines your English level</li>
                    <li>• There is no fixed number of questions</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Time Management</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• A timer is displayed at the top of the screen</li>
                    <li>• The timer turns red in the final 5 minutes</li>
                    <li>• Tests will auto-submit when time expires</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Linguaskill Test Setup</h1>
          <p className="text-gray-600">Complete the following steps to begin your test</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${index <= currentStep 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-2
                      ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={(currentStep + 1) / steps.length * 100} className="h-2" />
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep].icon, { className: "h-5 w-5" })}
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === steps.length - 1 ? 'Start Test' : 'Next'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
