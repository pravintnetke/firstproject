import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface IDVerificationProps {
  onVerificationComplete: (verified: boolean) => void;
}

export function IDVerification({ onVerificationComplete }: IDVerificationProps) {
  const [idImage, setIdImage] = useState<string | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageCapture = (type: 'id' | 'face') => {
    // Simulate image capture
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d')!;
    
    // Create a sample image with text
    ctx.fillStyle = type === 'id' ? '#e3f2fd' : '#f3e5f5';
    ctx.fillRect(0, 0, 400, 300);
    ctx.fillStyle = '#1976d2';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(type === 'id' ? 'ID Document' : 'Face Photo', 200, 150);
    
    const imageUrl = canvas.toDataURL();
    
    if (type === 'id') {
      setIdImage(imageUrl);
    } else {
      setFaceImage(imageUrl);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'face') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'id') {
          setIdImage(result);
        } else {
          setFaceImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const performVerification = async () => {
    if (!idImage || !faceImage) return;
    
    setIsProcessing(true);
    
    // Simulate AI verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate 90% success rate
    const isVerified = Math.random() > 0.1;
    setVerificationStatus(isVerified ? 'success' : 'failed');
    setIsProcessing(false);
    
    setTimeout(() => {
      onVerificationComplete(isVerified);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Identity Verification</CardTitle>
          <p className="text-muted-foreground">
            Please upload your ID document and take a face photo for verification
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* ID Document Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Upload className="w-5 h-5" />
                ID Document
              </h3>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center space-y-4">
                {idImage ? (
                  <div className="space-y-4">
                    <img src={idImage} alt="ID Document" className="max-w-full h-48 object-cover mx-auto rounded" />
                    <Button variant="outline" onClick={() => setIdImage(null)}>
                      Replace Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div className="space-y-2">
                      <Button variant="outline" onClick={() => document.getElementById('id-upload')?.click()}>
                        Upload Document
                      </Button>
                      <input
                        id="id-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'id')}
                      />
                      <p className="text-sm text-muted-foreground">
                        Supported: JPG, PNG, PDF
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Face Photo Capture */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Face Photo
              </h3>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center space-y-4">
                {faceImage ? (
                  <div className="space-y-4">
                    <img src={faceImage} alt="Face Photo" className="max-w-full h-48 object-cover mx-auto rounded" />
                    <Button variant="outline" onClick={() => setFaceImage(null)}>
                      Retake Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div className="space-y-2">
                      <Button onClick={() => handleImageCapture('face')}>
                        <Camera className="w-4 h-4 mr-2" />
                        Capture Photo
                      </Button>
                      <Button variant="outline" onClick={() => document.getElementById('face-upload')?.click()}>
                        Upload Photo
                      </Button>
                      <input
                        id="face-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'face')}
                      />
                      <p className="text-sm text-muted-foreground">
                        Look directly at camera
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Verification Status */}
          {verificationStatus !== 'pending' && (
            <Alert className={verificationStatus === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              {verificationStatus === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={verificationStatus === 'success' ? 'text-green-800' : 'text-red-800'}>
                {verificationStatus === 'success' 
                  ? 'Identity verification successful! You may proceed to the exam.'
                  : 'Identity verification failed. Please ensure clear, well-lit photos and try again.'
                }
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {idImage && faceImage && verificationStatus === 'pending' && (
              <Button 
                onClick={performVerification}
                disabled={isProcessing}
                className="px-8"
              >
                {isProcessing ? 'Verifying...' : 'Verify Identity'}
              </Button>
            )}
            
            {verificationStatus === 'failed' && (
              <Button onClick={() => {
                setVerificationStatus('pending');
                setIdImage(null);
                setFaceImage(null);
              }}>
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}