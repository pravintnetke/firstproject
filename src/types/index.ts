export type UserRole = 'admin' | 'candidate';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ProctoringSettings {
  webcamEnabled: boolean;
  screenRecording: boolean;
  tabSwitchDetection: boolean;
  faceDetection: boolean;
  audioRecording: boolean;
}

export interface ExamSettings {
  allowBackward: boolean;
  showResults: boolean;
  autoSubmit: boolean;
  showQuestionPalette: boolean;
  fullScreenMode: boolean;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  candidateId: string;
  startTime: string;
  endTime?: string;
  currentQuestionIndex: number;
  answers: Record<string, string | number>;
  flaggedQuestions: string[];
  proctoringEvents: ProctoringEvent[];
  systemChecks: SystemCheck[];
}

export interface ProctoringEvent {
  id: string;
  type: 'tab_switch' | 'face_not_detected' | 'multiple_faces' | 'suspicious_activity';
  timestamp: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface SystemCheck {
  component: 'camera' | 'microphone' | 'browser' | 'internet';
  status: 'passed' | 'failed' | 'warning';
  message: string;
  timestamp: string;
}

export interface ExamWorkflowStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

// Re-export from sampleData for convenience
export type {
  User,
  Question,
  Exam,
  Batch,
  ExamResult
} from '../data/sampleData';