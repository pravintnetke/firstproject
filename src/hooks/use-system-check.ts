import { useState, useEffect } from 'react';

export interface SystemRequirement {
  name: string;
  status: 'checking' | 'passed' | 'failed' | 'warning';
  message: string;
  details?: string;
}

export interface SystemCheckResult {
  browser: SystemRequirement;
  camera: SystemRequirement;
  microphone: SystemRequirement;
  internet: SystemRequirement;
  overall: 'checking' | 'ready' | 'issues' | 'failed';
}

export function useSystemCheck() {
  const [systemCheck, setSystemCheck] = useState<SystemCheckResult>({
    browser: { name: 'Browser', status: 'checking', message: 'Checking...' },
    camera: { name: 'Camera', status: 'checking', message: 'Checking...' },
    microphone: { name: 'Microphone', status: 'checking', message: 'Checking...' },
    internet: { name: 'Internet', status: 'checking', message: 'Checking...' },
    overall: 'checking'
  });

  const checkBrowser = (): SystemRequirement => {
    const userAgent = navigator.userAgent;
    const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
    const isFirefox = /Firefox/.test(userAgent);
    const isEdge = /Edg/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor);

    // Check for required features
    const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasWebRTC = !!(window.RTCPeerConnection || (window as any).webkitRTCPeerConnection);
    const hasFullscreen = !!(document.fullscreenEnabled || (document as any).webkitFullscreenEnabled);

    if (!hasMediaDevices || !hasWebRTC) {
      return {
        name: 'Browser',
        status: 'failed',
        message: 'Incompatible',
        details: 'Browser lacks required features for proctoring'
      };
    }

    if (isChrome) {
      return {
        name: 'Browser',
        status: 'passed',
        message: 'Chrome (Compatible)',
        details: 'Fully supported browser'
      };
    } else if (isFirefox || isEdge) {
      return {
        name: 'Browser',
        status: 'warning',
        message: `${isFirefox ? 'Firefox' : 'Edge'} (Supported)`,
        details: 'Some features may have limited support'
      };
    } else if (isSafari) {
      return {
        name: 'Browser',
        status: 'warning',
        message: 'Safari (Limited)',
        details: 'Some proctoring features may not work properly'
      };
    } else {
      return {
        name: 'Browser',
        status: 'failed',
        message: 'Unsupported Browser',
        details: 'Please use Chrome, Firefox, Edge, or Safari'
      };
    }
  };

  const checkCamera = async (): Promise<SystemRequirement> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return {
          name: 'Camera',
          status: 'failed',
          message: 'Not Available',
          details: 'Camera API not supported'
        };
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      // Check if we got a video track
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length === 0) {
        return {
          name: 'Camera',
          status: 'failed',
          message: 'No Camera Found',
          details: 'No video input devices detected'
        };
      }

      // Clean up the stream
      stream.getTracks().forEach(track => track.stop());

      return {
        name: 'Camera',
        status: 'passed',
        message: 'Working',
        details: `${videoTracks[0].label || 'Camera detected'}`
      };
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        return {
          name: 'Camera',
          status: 'failed',
          message: 'Permission Denied',
          details: 'Please allow camera access for proctoring'
        };
      } else if (error.name === 'NotFoundError') {
        return {
          name: 'Camera',
          status: 'failed',
          message: 'Not Found',
          details: 'No camera device found'
        };
      } else {
        return {
          name: 'Camera',
          status: 'failed',
          message: 'Error',
          details: 'Failed to access camera'
        };
      }
    }
  };

  const checkMicrophone = async (): Promise<SystemRequirement> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return {
          name: 'Microphone',
          status: 'failed',
          message: 'Not Available',
          details: 'Microphone API not supported'
        };
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true 
      });
      
      // Check if we got an audio track
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        return {
          name: 'Microphone',
          status: 'failed',
          message: 'No Microphone Found',
          details: 'No audio input devices detected'
        };
      }

      // Clean up the stream
      stream.getTracks().forEach(track => track.stop());

      return {
        name: 'Microphone',
        status: 'passed',
        message: 'Working',
        details: `${audioTracks[0].label || 'Microphone detected'}`
      };
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        return {
          name: 'Microphone',
          status: 'failed',
          message: 'Permission Denied',
          details: 'Please allow microphone access for proctoring'
        };
      } else if (error.name === 'NotFoundError') {
        return {
          name: 'Microphone',
          status: 'failed',
          message: 'Not Found',
          details: 'No microphone device found'
        };
      } else {
        return {
          name: 'Microphone',
          status: 'failed',
          message: 'Error',
          details: 'Failed to access microphone'
        };
      }
    }
  };

  const checkInternetSpeed = async (): Promise<SystemRequirement> => {
    try {
      // Test connection latency and basic connectivity
      const startTime = performance.now();
      
      // Use a reliable external service for speed testing
      // We'll test with multiple small requests to get a better average
      const testUrls = [
        'https://httpbin.org/bytes/10000',
        'https://jsonplaceholder.typicode.com/posts',
        'https://api.github.com/zen'
      ];
      
      let totalBytes = 0;
      let totalDuration = 0;
      let successfulTests = 0;
      
      for (const url of testUrls) {
        try {
          const requestStart = performance.now();
          const response = await fetch(url + '?t=' + Date.now(), {
            cache: 'no-cache',
            mode: 'cors'
          });
          
          if (response.ok) {
            const data = await response.text();
            const requestEnd = performance.now();
            const duration = (requestEnd - requestStart) / 1000;
            
            totalBytes += data.length;
            totalDuration += duration;
            successfulTests++;
          }
        } catch (e) {
          // Skip failed requests
          continue;
        }
      }
      
      if (successfulTests === 0) {
        throw new Error('All speed tests failed');
      }
      
      // Calculate average speed
      const avgDuration = totalDuration / successfulTests;
      const avgBytes = totalBytes / successfulTests;
      const speedMbps = (avgBytes * 8) / (avgDuration * 1000000);
      
      // More realistic thresholds for proctoring
      if (speedMbps >= 2 || avgDuration < 1) {
        return {
          name: 'Internet',
          status: 'passed',
          message: `Stable Connection`,
          details: `Response time: ${avgDuration.toFixed(0)}ms - Good for proctoring`
        };
      } else if (speedMbps >= 0.5 || avgDuration < 3) {
        return {
          name: 'Internet',
          status: 'warning',
          message: `Moderate Connection`,
          details: `Response time: ${avgDuration.toFixed(0)}ms - May have occasional delays`
        };
      } else {
        return {
          name: 'Internet',
          status: 'failed',
          message: `Slow Connection`,
          details: `Response time: ${avgDuration.toFixed(0)}ms - Too slow for reliable proctoring`
        };
      }
    } catch (error) {
      // Fallback: Check if we're online
      if (!navigator.onLine) {
        return {
          name: 'Internet',
          status: 'failed',
          message: 'Offline',
          details: 'No internet connection detected'
        };
      }
      
      // Simple connectivity test
      try {
        const pingStart = performance.now();
        await fetch('https://www.google.com/favicon.ico', {
          method: 'HEAD',
          cache: 'no-cache',
          mode: 'no-cors'
        });
        const pingTime = performance.now() - pingStart;
        
        return {
          name: 'Internet',
          status: 'warning',
          message: 'Connected',
          details: `Basic connectivity confirmed (${pingTime.toFixed(0)}ms)`
        };
      } catch (e) {
        return {
          name: 'Internet',
          status: 'warning',
          message: 'Connected',
          details: 'Unable to test speed, but browser reports online'
        };
      }
    }
  };

  const runSystemCheck = async () => {
    // Check browser first (synchronous)
    const browserResult = checkBrowser();
    setSystemCheck(prev => ({
      ...prev,
      browser: browserResult
    }));

    // Check camera, microphone, and internet in parallel
    const [cameraResult, microphoneResult, internetResult] = await Promise.all([
      checkCamera(),
      checkMicrophone(),
      checkInternetSpeed()
    ]);

    // Determine overall status
    const hasFailures = [browserResult, cameraResult, microphoneResult, internetResult].some(req => 
      req.status === 'failed'
    );
    const hasWarnings = [browserResult, cameraResult, microphoneResult, internetResult].some(req => 
      req.status === 'warning'
    );

    let overallStatus: 'checking' | 'ready' | 'issues' | 'failed';
    if (hasFailures) {
      overallStatus = 'failed';
    } else if (hasWarnings) {
      overallStatus = 'issues';
    } else {
      overallStatus = 'ready';
    }

    const newSystemCheck = {
      browser: browserResult,
      camera: cameraResult,
      microphone: microphoneResult,
      internet: internetResult,
      overall: overallStatus
    };

    setSystemCheck(newSystemCheck);
  };

  useEffect(() => {
    runSystemCheck();
  }, []);

  return {
    systemCheck,
    refreshCheck: runSystemCheck
  };
}
