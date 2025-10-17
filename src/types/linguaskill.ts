// Linguaskill Test Platform Types and Interfaces

export type LinguaskillModule = 'reading' | 'listening' | 'writing' | 'speaking';

export type LinguaskillQuestionType = 
  // Reading types
  | 'read_and_select'
  | 'image_based_mcq'
  | 'open_gap_fill'
  | 'gap_fill_select'
  | 'extended_reading'
  | 'missing_sentence_completion'
  | 'missing_paragraph_completion'
  | 'multiple_text_matching'
  // Listening types
  | 'listening_mcq_sentences'
  | 'listening_mcq_pictures'
  | 'longer_listening_task'
  | 'sentence_completion_typing'
  | 'table_completion_matching'
  // Writing types
  | 'essay_writing'
  // Speaking types
  | 'justify_opinion'
  | 'summarize_and_discuss'
  | 'make_recommendation'
  | 'discuss_statement';

export interface LinguaskillQuestion {
  id: string;
  type: LinguaskillQuestionType;
  module: LinguaskillModule;
  text: string;
  title?: string; // optional title for questions
  preparationTime?: number; // seconds
  responseTime?: number; // seconds for speaking
  audioUrl?: string; // for listening questions
  imageUrl?: string; // for image-based questions
  options?: string[];
  correctAnswer?: string | number | string[];
  gaps?: number; // for gap-fill questions
  gapOptions?: string[][]; // for gap-fill select questions - array of options for each gap
  dragDropOptions?: string[]; // for drag-drop questions
  textSources?: string[]; // for multiple text matching
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; // CEFR levels
  adaptiveWeight: number; // for adaptive algorithm
  wordCountMin?: number; // for writing tasks
  wordCountMax?: number; // for writing tasks
}

export interface LinguaskillTest {
  id: string;
  title: string;
  modules: LinguaskillModule[];
  isAdaptive: boolean;
  maxDuration: number; // minutes
  questions: LinguaskillQuestion[];
  candidateInfo: CandidateInfo;
  status: 'not_started' | 'in_progress' | 'completed';
  currentModule?: LinguaskillModule;
  moduleStatuses: Record<LinguaskillModule, ModuleStatus>;
}

export interface CandidateInfo {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  nationality: string;
  nativeLanguage: string;
  testCenter: string;
  candidateNumber: string;
  photoUrl?: string;
  additionalInfo: Record<string, string>;
}

export interface ModuleStatus {
  status: 'not_started' | 'active' | 'completed';
  startTime?: string;
  endTime?: string;
  currentQuestionIndex: number;
  answers: Record<string, any>;
  estimatedLevel?: string; // CEFR level
  score?: number;
}

export interface EquipmentCheck {
  type: 'sound' | 'microphone';
  status: 'not_tested' | 'testing' | 'passed' | 'failed';
  testAudioUrl?: string;
  recordedAudioUrl?: string;
  volume?: number;
  timestamp?: string;
}

export interface AdaptiveTestingState {
  currentLevel: number; // 1-6 representing A1-C2
  confidence: number; // 0-1
  questionsAnswered: number;
  correctAnswers: number;
  isComplete: boolean;
  estimatedCEFRLevel: string;
}

export interface SpeakingRecording {
  questionId: string;
  audioBlob: Blob;
  duration: number;
  timestamp: string;
  waveformData?: number[];
}

export interface WritingResponse {
  questionId: string;
  text: string;
  wordCount: number;
  timestamp: string;
  editHistory: WritingEdit[];
}

export interface WritingEdit {
  timestamp: string;
  action: 'insert' | 'delete' | 'replace';
  position: number;
  content: string;
}

export interface ListeningPlayback {
  questionId: string;
  playCount: number;
  totalPlays: number;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

export interface TestProgress {
  moduleProgress: Record<LinguaskillModule, number>; // percentage
  overallProgress: number;
  timeSpent: Record<LinguaskillModule, number>; // minutes
  questionsCompleted: Record<LinguaskillModule, number>;
  totalQuestions: Record<LinguaskillModule, number>;
}

export interface LinguaskillResult {
  testId: string;
  candidateId: string;
  overallScore: number;
  cefrLevel: string;
  moduleScores: Record<LinguaskillModule, ModuleResult>;
  completedAt: string;
  duration: number; // minutes
  certificate?: string; // URL to certificate
}

export interface ModuleResult {
  score: number;
  cefrLevel: string;
  questionsAttempted: number;
  accuracy: number;
  timeSpent: number; // minutes
  strengths: string[];
  areasForImprovement: string[];
}

// Pre-test workflow steps
export interface PreTestStep {
  id: string;
  title: string;
  description: string;
  component: string;
  isRequired: boolean;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  data?: any;
}

export interface TestSession {
  id: string;
  testId: string;
  candidateId: string;
  startTime: string;
  endTime?: string;
  currentStep: string;
  preTestSteps: PreTestStep[];
  equipmentChecks: EquipmentCheck[];
  moduleAttempts: Record<LinguaskillModule, ModuleAttempt>;
  violations: TestViolation[];
}

export interface ModuleAttempt {
  moduleId: LinguaskillModule;
  startTime: string;
  endTime?: string;
  questions: LinguaskillQuestion[];
  responses: Record<string, any>;
  adaptiveState?: AdaptiveTestingState;
  recordings?: SpeakingRecording[];
  playbackHistory?: ListeningPlayback[];
}

export interface TestViolation {
  id: string;
  type: 'navigation_attempt' | 'time_exceeded' | 'technical_issue';
  timestamp: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
}

// Navigation and UI state
export interface NavigationState {
  canGoBack: boolean;
  canGoForward: boolean;
  canSkip: boolean;
  showWarningOnSkip: boolean;
  showProgressIndicator: boolean;
  showTimer: boolean;
  timerColor: 'normal' | 'warning' | 'danger';
}

export interface UIState {
  isFullscreen: boolean;
  showInstructions: boolean;
  showQuestionPalette: boolean;
  activePanel: 'question' | 'instructions' | 'review';
  theme: 'light' | 'dark' | 'high-contrast';
  fontSize: 'small' | 'medium' | 'large';
}
