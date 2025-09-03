import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, CameraOff, Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WebcamMonitorProps {
  isActive: boolean;
  onToggleCamera: () => void;
  onViolationDetected?: (type: string) => void;
}

export function WebcamMonitor({ isActive, onToggleCamera, onViolationDetected }: WebcamMonitorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [violations, setViolations] = useState<string[]>([]);
  const [faceDetected, setFaceDetected] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (isActive) {
      startCamera();
      startRecording();
    } else {
      stopCamera();
      stopRecording();
    }

    return () => {
      stopCamera();
      stopRecording();
    };
  }, [isActive]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 },
        audio: false 
      });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      // Simulate face detection
      startFaceDetection();
    } catch (error) {
      console.error('Error accessing camera:', error);
      addViolation('Camera access denied');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Simulate recording
    console.log('Started screen and webcam recording');
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log('Stopped recording');
  };

  const startFaceDetection = () => {
    // Simulate face detection with random intervals
    const detectFace = () => {
      const detected = Math.random() > 0.1; // 90% chance face is detected
      setFaceDetected(detected);
      
      if (!detected) {
        addViolation('Face not detected');
        onViolationDetected?.('face_not_detected');
      }
      
      // Check again in 2-5 seconds
      setTimeout(detectFace, 2000 + Math.random() * 3000);
    };
    
    setTimeout(detectFace, 2000);
  };

  const addViolation = (violation: string) => {
    setViolations(prev => [...prev, `${new Date().toLocaleTimeString()}: ${violation}`]);
  };

  return (
    <div className="space-y-4">
      {/* Camera Feed */}
      <Card className={`transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50' : 'w-64'}`}>
        <CardContent className="p-2">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-full rounded border ${isExpanded ? 'h-96' : 'h-36'} bg-muted object-cover`}
            />
            
            {/* Status Overlays */}
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge variant={faceDetected ? "default" : "destructive"} className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                {faceDetected ? 'Face OK' : 'No Face'}
              </Badge>
              
              {isRecording && (
                <Badge variant="secondary" className="text-xs animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
                  REC
                </Badge>
              )}
            </div>
            
            {/* Controls */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </Button>
              
              <Button
                size="sm"
                variant={isActive ? "default" : "outline"}
                className="h-8 w-8 p-0"
                onClick={onToggleCamera}
              >
                {isActive ? <Camera className="w-3 h-3" /> : <CameraOff className="w-3 h-3" />}
              </Button>
            </div>
          </div>
          
          {/* Camera Status */}
          <div className="mt-2 text-center">
            <p className="text-xs text-muted-foreground">
              {isActive ? 'Monitoring Active' : 'Camera Disabled'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Violation Alerts */}
      {violations.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <EyeOff className="h-4 w-4 text-red-600" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium text-red-800">Proctoring Violations Detected:</p>
              <div className="text-sm text-red-700 max-h-20 overflow-y-auto">
                {violations.slice(-3).map((violation, index) => (
                  <div key={index}>{violation}</div>
                ))}
              </div>
              {violations.length > 3 && (
                <p className="text-xs text-red-600">+{violations.length - 3} more violations</p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Proctoring Info */}
      {!isExpanded && (
        <Card>
          <CardContent className="p-3">
            <div className="text-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={isActive ? "default" : "secondary"}>
                  {isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Violations:</span>
                <Badge variant={violations.length > 0 ? "destructive" : "default"}>
                  {violations.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Recording:</span>
                <Badge variant={isRecording ? "default" : "secondary"}>
                  {isRecording ? 'ON' : 'OFF'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}