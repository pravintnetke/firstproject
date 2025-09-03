import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Mic, 
  Monitor, 
  Wifi, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  RefreshCw,
  Shield
} from 'lucide-react';

interface SystemCheckProps {
  onComplete?: (results: SystemCheckResults) => void;
}

export interface SystemCheckResults {
  camera: 'passed' | 'failed' | 'checking';
  microphone: 'passed' | 'failed' | 'checking';
  browser: 'passed' | 'failed' | 'checking';
  internet: 'passed' | 'failed' | 'checking';
  overall: 'passed' | 'failed' | 'checking';
}

export default function SystemCheck({ onComplete }: SystemCheckProps) {
  const [results, setResults] = useState<SystemCheckResults>({
    camera: 'checking',
    microphone: 'checking',
    browser: 'checking',
    internet: 'checking',
    overall: 'checking'
  });
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    runSystemCheck();
  }, []);

  const runSystemCheck = async () => {
    setIsRunning(true);
    setProgress(0);
    
    // Reset results
    setResults({
      camera: 'checking',
      microphone: 'checking',
      browser: 'checking',
      internet: 'checking',
      overall: 'checking'
    });

    // Check browser compatibility
    setProgress(25);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const browserResult = checkBrowser();
    setResults(prev => ({ ...prev, browser: browserResult }));

    // Check internet connection
    setProgress(50);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const internetResult = await checkInternetConnection();
    setResults(prev => ({ ...prev, internet: internetResult }));

    // Check camera
    setProgress(75);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const cameraResult = await checkCamera();
    setResults(prev => ({ ...prev, camera: cameraResult }));

    // Check microphone
    setProgress(100);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const microphoneResult = await checkMicrophone();
    
    const finalResults = {
      camera: cameraResult,
      microphone: microphoneResult,
      browser: browserResult,
      internet: internetResult,
      overall: (cameraResult === 'passed' && microphoneResult === 'passed' && 
                browserResult === 'passed' && internetResult === 'passed') ? 'passed' as const : 'failed' as const
    };
    
    setResults(finalResults);
    setIsRunning(false);
    
    if (onComplete) {
      onComplete(finalResults);
    }
  };

  const checkBrowser = (): 'passed' | 'failed' => {
    const userAgent = navigator.userAgent;
    const isChrome = /Chrome/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
    return (isChrome || isFirefox || isSafari) ? 'passed' : 'failed';
  };

  const checkInternetConnection = async (): Promise<'passed' | 'failed'> => {
    try {
      const response = await fetch('/api/ping', { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      return response.ok ? 'passed' : 'failed';
    } catch (error) {
      // Simulate connection check
      return navigator.onLine ? 'passed' : 'failed';
    }
  };

  const checkCamera = async (): Promise<'passed' | 'failed'> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      return 'passed';
    } catch (error) {
      return 'failed';
    }
  };

  const checkMicrophone = async (): Promise<'passed' | 'failed'> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return 'passed';
    } catch (error) {
      return 'failed';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'checking':
        return <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-success">Passed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'checking':
        return <Badge variant="outline">Checking...</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const checkItems = [
    {
      id: 'camera',
      icon: Camera,
      title: 'Camera Access',
      description: 'Required for identity verification and proctoring',
      status: results.camera,
      critical: true
    },
    {
      id: 'microphone',
      icon: Mic,
      title: 'Microphone Access',
      description: 'Required for audio monitoring during exam',
      status: results.microphone,
      critical: true
    },
    {
      id: 'browser',
      icon: Monitor,
      title: 'Browser Compatibility',
      description: 'Chrome, Firefox, or Safari recommended',
      status: results.browser,
      critical: false
    },
    {
      id: 'internet',
      icon: Wifi,
      title: 'Internet Connection',
      description: 'Stable connection required for exam delivery',
      status: results.internet,
      critical: true
    }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <CardTitle>System Requirements Check</CardTitle>
        <CardDescription>
          Verifying your system compatibility for secure online examination
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Checking system components...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Check Results */}
        <div className="space-y-4">
          {checkItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    {item.title}
                    {item.critical && (
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {getStatusIcon(item.status)}
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>

        {/* Overall Result */}
        {!isRunning && (
          <div className={`p-4 rounded-lg border-2 ${
            results.overall === 'passed' 
              ? 'border-success bg-success/5' 
              : 'border-destructive bg-destructive/5'
          }`}>
            <div className="flex items-center gap-3">
              {getStatusIcon(results.overall)}
              <div>
                <h3 className="font-semibold">
                  {results.overall === 'passed' 
                    ? 'System Ready for Examination' 
                    : 'System Issues Detected'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {results.overall === 'passed'
                    ? 'All required components are working correctly. You can proceed with the exam.'
                    : 'Some components failed the check. Please resolve the issues before starting your exam.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={runSystemCheck} disabled={isRunning}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            Retry Check
          </Button>
          
          {!isRunning && results.overall === 'passed' && (
            <Button className="bg-gradient-primary">
              Continue to Exam
            </Button>
          )}
          
          {!isRunning && results.overall === 'failed' && (
            <Button variant="destructive" disabled>
              Fix Issues First
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}