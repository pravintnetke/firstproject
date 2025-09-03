export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'candidate';
  avatar?: string;
  createdAt: string;
  phone?: string;
  address?: string;
  institution?: string;
  enrollmentNumber?: string;
  department?: string;
  state?: string;
  city?: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'subjective' | 'true-false';
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options?: string[];
  correctAnswer?: string | number;
  marks: number;
  negativeMarks?: number;
  explanation?: string;
  language?: 'hindi' | 'english' | 'tamil' | 'telugu';
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  subject: string;
  duration: number; // minutes
  totalMarks: number;
  passingMarks: number;
  negativeMarking: boolean;
  randomizeQuestions: boolean;
  proctoringEnabled: boolean;
  status: 'draft' | 'published' | 'completed';
  startDate: string;
  endDate: string;
  questions: Question[];
  assignedCandidates: string[];
  examType: 'entrance' | 'semester' | 'competitive' | 'placement';
  board?: 'CBSE' | 'ICSE' | 'State Board' | 'University';
}

export interface Batch {
  id: string;
  name: string;
  description: string;
  candidates: string[];
  createdAt: string;
  academic_year: string;
  course: string;
  semester?: number;
}

export interface ExamResult {
  id: string;
  examId: string;
  candidateId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  status: 'passed' | 'failed';
  submittedAt: string;
  timeTaken: number; // minutes
  answers: Record<string, string | number>;
  rank?: number;
  subjectWiseScore?: Record<string, number>;
}

export interface ProctoringEvent {
  id: string;
  examId: string;
  candidateId: string;
  eventType: 'face_detection' | 'multiple_faces' | 'no_face' | 'tab_switch' | 'copy_paste' | 'mobile_detected' | 'suspicious_activity';
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  resolved: boolean;
  evidenceUrl?: string;
  actionTaken?: string;
}

export interface SystemCheck {
  id: string;
  candidateId: string;
  examId: string;
  timestamp: string;
  cameraStatus: 'working' | 'not_working' | 'permission_denied';
  microphoneStatus: 'working' | 'not_working' | 'permission_denied';
  internetSpeed: number; // Mbps
  browserInfo: string;
  screenResolution: string;
  systemSpecs: {
    os: string;
    browser: string;
    ram: string;
    processor: string;
  };
  overallStatus: 'pass' | 'warning' | 'fail';
}

export interface IDVerification {
  id: string;
  candidateId: string;
  examId: string;
  timestamp: string;
  idType: 'aadhaar' | 'pan' | 'driving_license' | 'voter_id' | 'passport';
  idNumber: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  faceMatchScore: number; // percentage
  documentQuality: 'good' | 'average' | 'poor';
  verifiedBy?: string;
  rejectionReason?: string;
}

// COMPREHENSIVE INDIAN CONTEXT SAMPLE DATA

// Sample Users - Indian Names, Institutions, Locations
export const sampleUsers: User[] = [
  // Administrators
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@delhiuniv.ac.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=400',
    createdAt: '2024-01-15T04:30:00Z',
    phone: '+91-9876543210',
    address: 'Faculty Quarter, North Campus, Delhi University',
    institution: 'University of Delhi',
    department: 'Computer Science',
    city: 'New Delhi',
    state: 'Delhi'
  },
  {
    id: '2',
    name: 'Prof. Rajesh Kumar',
    email: 'rajesh.kumar@iitb.ac.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    createdAt: '2024-01-10T05:00:00Z',
    phone: '+91-9123456789',
    address: 'IIT Bombay Campus, Powai',
    institution: 'IIT Bombay',
    department: 'Electrical Engineering',
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  
  // Candidates
  {
    id: '3',
    name: 'Ananya Patel',
    email: 'ananya.patel@student.delhiuniv.ac.in',
    role: 'candidate',
    createdAt: '2024-02-01T04:00:00Z',
    phone: '+91-8765432109',
    address: 'Kamla Nagar, Delhi',
    institution: 'University of Delhi',
    enrollmentNumber: 'DU2024CS001',
    department: 'Computer Science',
    city: 'New Delhi',
    state: 'Delhi'
  },
  {
    id: '4',
    name: 'Arjun Singh',
    email: 'arjun.singh@student.delhiuniv.ac.in',
    role: 'candidate',
    createdAt: '2024-02-01T05:15:00Z',
    phone: '+91-7654321098',
    address: 'Lajpat Nagar, Delhi',
    institution: 'University of Delhi',
    enrollmentNumber: 'DU2024CS002',
    department: 'Computer Science',
    city: 'New Delhi',
    state: 'Delhi'
  },
  {
    id: '5',
    name: 'Priyanka Reddy',
    email: 'priyanka.reddy@student.iitb.ac.in',
    role: 'candidate',
    createdAt: '2024-02-02T06:20:00Z',
    phone: '+91-6543210987',
    address: 'Hostel 4, IIT Bombay',
    institution: 'IIT Bombay',
    enrollmentNumber: 'IITB2024EE001',
    department: 'Electrical Engineering',
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  {
    id: '6',
    name: 'Karan Mehta',
    email: 'karan.mehta@student.delhiuniv.ac.in',
    role: 'candidate',
    createdAt: '2024-02-03T04:45:00Z',
    phone: '+91-5432109876',
    address: 'Malviya Nagar, Delhi',
    institution: 'University of Delhi',
    enrollmentNumber: 'DU2024CS003',
    department: 'Computer Science',
    city: 'New Delhi',
    state: 'Delhi'
  },
  {
    id: '7',
    name: 'Sneha Gupta',
    email: 'sneha.gupta@student.iitb.ac.in',
    role: 'candidate',
    createdAt: '2024-02-04T07:30:00Z',
    phone: '+91-4321098765',
    address: 'Hostel 6, IIT Bombay',
    institution: 'IIT Bombay',
    enrollmentNumber: 'IITB2024EE002',
    department: 'Electrical Engineering',
    city: 'Mumbai',
    state: 'Maharashtra'
  }
];

// Indian Curriculum Relevant Questions
// export const sampleQuestions: Question[] = [
//   // Computer Science Questions
//   {
//     id: 'q1',
//     text: 'Which of the following is the correct syntax for declaring a variable in C++?',
//     type: 'mcq',
//     subject: 'Computer Science',
//     topic: 'Programming Fundamentals',
//     difficulty: 'easy',
//     options: ['int a;', 'variable int a;', 'declare int a;', 'int: a;'],
//     correctAnswer: 0,
//     marks: 2,
//     negativeMarks: 0.5,
//     explanation: 'In C++, variables are declared with the syntax: datatype variablename;',
//     language: 'english'
//   },
//   {
//     id: 'q2',
//     text: 'डेटा स्ट्रक्चर में स्टैक का कौन सा सिद्धांत काम करता है?',
//     type: 'mcq',
//     subject: 'Computer Science',
//     topic: 'Data Structures',
//     difficulty: 'medium',
//     options: ['FIFO', 'LIFO', 'LILO', 'FILO'],
//     correctAnswer: 1,
//     marks: 3,
//     negativeMarks: 1,
//     explanation: 'स्टैक में LIFO (Last In First Out) का सिद्धांत काम करता है।',
//     language: 'hindi'
//   },
//   {
//     id: 'q3',
//     text: 'Explain the concept of Object-Oriented Programming and its key principles with suitable examples.',
//     type: 'subjective',
//     subject: 'Computer Science',
//     topic: 'Object-Oriented Programming',
//     difficulty: 'hard',
//     marks: 10,
//     explanation: 'OOP includes principles like Encapsulation, Inheritance, Polymorphism, and Abstraction.',
//     language: 'english'
//   },
  
//   // Mathematics Questions
//   {
//     id: 'q4',
//     text: 'भारत में सबसे लंबी नदी कौन सी है?',
//     type: 'mcq',
//     subject: 'Geography',
//     topic: 'Indian Rivers',
//     difficulty: 'easy',
//     options: ['गंगा', 'यमुना', 'गोदावरी', 'नर्मदा'],
//     correctAnswer: 0,
//     marks: 2,
//     negativeMarks: 0.5,
//     explanation: 'गंगा भारत की सबसे लंबी नदी है जो 2525 किमी लंबी है।',
//     language: 'hindi'
//   },
//   {
//     id: 'q5',
//     text: 'Find the derivative of f(x) = 3x² + 2x + 5',
//     type: 'mcq',
//     subject: 'Mathematics',
//     topic: 'Calculus',
//     difficulty: 'medium',
//     options: ['6x + 2', '3x + 2', '6x² + 2x', '6x + 2 + 5'],
//     correctAnswer: 0,
//     marks: 3,
//     negativeMarks: 1,
//     explanation: 'The derivative of 3x² + 2x + 5 is 6x + 2 using the power rule.',
//     language: 'english'
//   },
  
//   // Indian History & Civics
//   {
//     id: 'q6',
//     text: 'भारतीय संविधान में कितने मौलिक अधिकार हैं?',
//     type: 'mcq',
//     subject: 'Civics',
//     topic: 'Indian Constitution',
//     difficulty: 'medium',
//     options: ['5', '6', '7', '8'],
//     correctAnswer: 1,
//     marks: 2,
//     negativeMarks: 0.5,
//     explanation: 'भारतीय संविधान में 6 मौलिक अधिकार हैं।',
//     language: 'hindi'
//   },
//   {
//     id: 'q7',
//     text: 'स्वतंत्रता संग्राम में "करो या मरो" का नारा किसने दिया?',
//     type: 'mcq',
//     subject: 'History',
//     topic: 'Freedom Struggle',
//     difficulty: 'easy',
//     options: ['महात्मा गांधी', 'जवाहरलाल नेहरू', 'सुभाष चंद्र बोस', 'सरदार पटेल'],
//     correctAnswer: 0,
//     marks: 2,
//     negativeMarks: 0.5,
//     explanation: 'महात्मा गांधी ने 1942 में भारत छोड़ो आंदोलन के दौरान "करो या मरो" का नारा दिया।',
//     language: 'hindi'
//   },
  
//   // Science Questions
//   {
//     id: 'q8',
//     text: 'The process of respiration in plants occurs during:',
//     type: 'mcq',
//     subject: 'Biology',
//     topic: 'Plant Physiology',
//     difficulty: 'medium',
//     options: ['Only during day', 'Only during night', 'Both day and night', 'Only when there is no photosynthesis'],
//     correctAnswer: 2,
//     marks: 3,
//     negativeMarks: 1,
//     explanation: 'Plants respire continuously, both during day and night, unlike photosynthesis which occurs only during day.',
//     language: 'english'
//   },
//   {
//     id: 'q9',
//     text: 'भारत का राष्ट्रीय पक्षी कौन सा है?',
//     type: 'true-false',
//     subject: 'General Knowledge',
//     topic: 'National Symbols',
//     difficulty: 'easy',
//     options: ['मोर', 'कबूतर'],
//     correctAnswer: 0,
//     marks: 1,
//     explanation: 'मोर भारत का राष्ट्रीय पक्षी है।',
//     language: 'hindi'
//   },
//   {
//     id: 'q10',
//     text: 'Explain the importance of the Green Revolution in India and its impact on agriculture.',
//     type: 'subjective',
//     subject: 'Economics',
//     topic: 'Agricultural Development',
//     difficulty: 'hard',
//     marks: 8,
//     explanation: 'Green Revolution helped India achieve food self-sufficiency through high-yielding varieties, fertilizers, and irrigation.',
//     language: 'english'
//   }
// ];
export const sampleQuestions: Question[] = [
  // Computer Science Questions
  {
    id: 'q1',
    text: 'Which of the following is the correct syntax for declaring a variable in C++?',
    type: 'mcq',
    subject: 'Computer Science',
    topic: 'Programming Fundamentals',
    difficulty: 'easy',
    options: ['int a;', 'variable int a;', 'declare int a;', 'int: a;'],
    correctAnswer: 0,
    marks: 2,
    negativeMarks: 0.5,
    explanation: 'In C++, variables are declared with the syntax: datatype variablename;',
    language: 'english'
  },
  {
    id: 'q2',
    text: 'Which principle does a stack follow in data structures?',
    type: 'mcq',
    subject: 'Computer Science',
    topic: 'Data Structures',
    difficulty: 'medium',
    options: ['FIFO', 'LIFO', 'LILO', 'FILO'],
    correctAnswer: 1,
    marks: 3,
    negativeMarks: 1,
    explanation: 'In a stack, the LIFO (Last In First Out) principle is followed.',
    language: 'english'
  },
  {
    id: 'q3',
    text: 'Explain the concept of Object-Oriented Programming and its key principles with suitable examples.',
    type: 'subjective',
    subject: 'Computer Science',
    topic: 'Object-Oriented Programming',
    difficulty: 'hard',
    marks: 10,
    explanation: 'OOP includes principles like Encapsulation, Inheritance, Polymorphism, and Abstraction.',
    language: 'english'
  },

  // Mathematics / Geography Questions
  {
    id: 'q4',
    text: 'Which is the longest river in India?',
    type: 'mcq',
    subject: 'Geography',
    topic: 'Indian Rivers',
    difficulty: 'easy',
    options: ['Ganga', 'Yamuna', 'Godavari', 'Narmada'],
    correctAnswer: 0,
    marks: 2,
    negativeMarks: 0.5,
    explanation: 'Ganga is the longest river in India with a length of 2525 km.',
    language: 'english'
  },
  {
    id: 'q5',
    text: 'Find the derivative of f(x) = 3x² + 2x + 5',
    type: 'mcq',
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'medium',
    options: ['6x + 2', '3x + 2', '6x² + 2x', '6x + 2 + 5'],
    correctAnswer: 0,
    marks: 3,
    negativeMarks: 1,
    explanation: 'The derivative of 3x² + 2x + 5 is 6x + 2 using the power rule.',
    language: 'english'
  },

  // Indian History & Civics
  {
    id: 'q6',
    text: 'How many Fundamental Rights are there in the Indian Constitution?',
    type: 'mcq',
    subject: 'Civics',
    topic: 'Indian Constitution',
    difficulty: 'medium',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1,
    marks: 2,
    negativeMarks: 0.5,
    explanation: 'There are 6 Fundamental Rights in the Indian Constitution.',
    language: 'english'
  },
  {
    id: 'q7',
    text: 'Who gave the slogan "Do or Die" during the freedom struggle?',
    type: 'mcq',
    subject: 'History',
    topic: 'Freedom Struggle',
    difficulty: 'easy',
    options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Subhas Chandra Bose', 'Sardar Patel'],
    correctAnswer: 0,
    marks: 2,
    negativeMarks: 0.5,
    explanation: 'Mahatma Gandhi gave the slogan "Do or Die" during the Quit India Movement in 1942.',
    language: 'english'
  },

  // Science Questions
  {
    id: 'q8',
    text: 'The process of respiration in plants occurs during:',
    type: 'mcq',
    subject: 'Biology',
    topic: 'Plant Physiology',
    difficulty: 'medium',
    options: ['Only during day', 'Only during night', 'Both day and night', 'Only when there is no photosynthesis'],
    correctAnswer: 2,
    marks: 3,
    negativeMarks: 1,
    explanation: 'Plants respire continuously, both during day and night, unlike photosynthesis which occurs only during day.',
    language: 'english'
  },
  {
    id: 'q9',
    text: 'What is the national bird of India?',
    type: 'true-false',
    subject: 'General Knowledge',
    topic: 'National Symbols',
    difficulty: 'easy',
    options: ['Peacock', 'Pigeon'],
    correctAnswer: 0,
    marks: 1,
    explanation: 'Peacock is the national bird of India.',
    language: 'english'
  },
  {
    id: 'q10',
    text: 'Explain the importance of the Green Revolution in India and its impact on agriculture.',
    type: 'subjective',
    subject: 'Economics',
    topic: 'Agricultural Development',
    difficulty: 'hard',
    marks: 8,
    explanation: 'Green Revolution helped India achieve food self-sufficiency through high-yielding varieties, fertilizers, and irrigation.',
    language: 'english'
  }
];

// Sample Batches - Indian Academic Context
export const sampleBatches: Batch[] = [
  {
    id: 'b1',
    name: 'B.Tech CSE 2024 - Semester 1',
    description: 'First semester Computer Science Engineering students',
    candidates: ['3', '4', '6'],
    createdAt: '2024-01-20T04:30:00Z',
    academic_year: '2024-25',
    course: 'B.Tech Computer Science',
    semester: 1
  },
  {
    id: 'b2',
    name: 'B.Tech EE 2024 - Semester 1',
    description: 'First semester Electrical Engineering students',
    candidates: ['5', '7'],
    createdAt: '2024-01-22T05:00:00Z',
    academic_year: '2024-25',
    course: 'B.Tech Electrical Engineering',
    semester: 1
  },
  {
    id: 'b3',
    name: 'JEE Mains 2025 Aspirants',
    description: 'Students preparing for JEE Mains 2025',
    candidates: ['3', '4', '5', '6', '7'],
    createdAt: '2024-02-01T04:00:00Z',
    academic_year: '2024-25',
    course: 'JEE Preparation'
  }
];

// END-TO-END COMPLETE EXAM SCENARIO
export const sampleExams: Exam[] = [
  {
    id: 'e1',
    title: 'JEE Mains 2025 Mock Test - Paper 1',
    description: 'Full-length mock test for JEE Mains 2025 with Physics, Chemistry, and Mathematics',
    subject: 'Engineering Entrance',
    duration: 180, // 3 hours
    totalMarks: 300,
    passingMarks: 90,
    negativeMarking: true,
    randomizeQuestions: true,
    proctoringEnabled: true,
    status: 'published',
    startDate: '2025-09-03T04:00:00Z', // 9:30 AM IST (currently active)
    endDate: '2025-09-03T12:00:00Z', // 5:30 PM IST (ends today)
    questions: sampleQuestions.slice(0, 8),
    assignedCandidates: ['3', '4', '5', '6', '7'],
    examType: 'entrance',
    board: 'CBSE'
  },
  {
    id: 'e2',
    title: 'Computer Science Semester 1 Final',
    description: 'Final examination for Computer Science first semester students',
    subject: 'Computer Science',
    duration: 120,
    totalMarks: 100,
    passingMarks: 40,
    negativeMarking: false,
    randomizeQuestions: false,
    proctoringEnabled: true,
    status: 'completed',
    startDate: '2024-12-10T04:00:00Z', // 9:30 AM IST
    endDate: '2024-12-10T09:00:00Z', // 2:30 PM IST
    questions: [sampleQuestions[0], sampleQuestions[1], sampleQuestions[2]],
    assignedCandidates: ['3', '4', '6'],
    examType: 'semester',
    board: 'University'
  },
  {
    id: 'e3',
    title: 'Indian Civics and Constitution Test',
    description: 'Assessment on Indian Constitution, Fundamental Rights, and Governance',
    subject: 'Civics',
    duration: 90,
    totalMarks: 50,
    passingMarks: 25,
    negativeMarking: true,
    randomizeQuestions: true,
    proctoringEnabled: true,
    status: 'published',
    startDate: '2024-12-20T05:00:00Z', // 10:30 AM IST
    endDate: '2024-12-20T12:00:00Z', // 5:30 PM IST
    questions: [sampleQuestions[5], sampleQuestions[6], sampleQuestions[8]],
    assignedCandidates: ['3', '4', '5', '6', '7'],
    examType: 'competitive',
    board: 'CBSE'
  }
];

// COMPREHENSIVE EXAM RESULTS - END-TO-END SCENARIO
export const sampleResults: ExamResult[] = [
  // JEE Mock Test Results
  {
    id: 'r1',
    examId: 'e1',
    candidateId: '3', // Ananya Patel
    score: 245,
    totalMarks: 300,
    percentage: 81.67,
    status: 'passed',
    submittedAt: '2024-12-15T06:25:00Z', // 11:55 AM IST (submitted 5 mins early)
    timeTaken: 175,
    answers: {
      q1: 0, // Correct
      q2: 1, // Incorrect
      q3: 'Object-oriented programming is a paradigm based on objects and classes...',
      q4: 0, // Correct
      q5: 0, // Correct
      q6: 1, // Correct
      q7: 0, // Correct
      q8: 2  // Correct
    },
    rank: 1,
    subjectWiseScore: {
      'Computer Science': 85,
      'Mathematics': 90,
      'Geography': 70
    }
  },
  {
    id: 'r2',
    examId: 'e1',
    candidateId: '4', // Arjun Singh
    score: 198,
    totalMarks: 300,
    percentage: 66.00,
    status: 'failed',
    submittedAt: '2024-12-15T06:30:00Z', // 12:00 PM IST (on time)
    timeTaken: 180,
    answers: {
      q1: 1, // Incorrect
      q2: 1, // Correct
      q3: 'OOP includes encapsulation and inheritance...',
      q4: 0, // Correct
      q5: 1, // Incorrect
      q6: 2, // Incorrect
      q7: 0, // Correct
      q8: 1  // Incorrect
    },
    rank: 4,
    subjectWiseScore: {
      'Computer Science': 60,
      'Mathematics': 55,
      'Geography': 83
    }
  },
  {
    id: 'r3',
    examId: 'e2', // CS Semester Final
    candidateId: '3', // Ananya Patel
    score: 85,
    totalMarks: 100,
    percentage: 85.00,
    status: 'passed',
    submittedAt: '2024-12-10T05:55:00Z',
    timeTaken: 115,
    answers: {
      q1: 0, // Correct
      q2: 1, // Correct
      q3: 'Object-oriented programming is a programming paradigm that uses objects and classes to organize code. The key principles include: 1. Encapsulation - bundling data and methods together...'
    },
    rank: 1,
    subjectWiseScore: {
      'Programming': 90,
      'Data Structures': 80
    }
  }
];

// PROCTORING EVENTS - REALISTIC INDIAN EXAM SCENARIO
export const sampleProctoringEvents: ProctoringEvent[] = [
  {
    id: 'pe1',
    examId: 'e1',
    candidateId: '3',
    eventType: 'tab_switch',
    timestamp: '2024-12-15T04:15:00Z', // 9:45 AM IST
    severity: 'medium',
    description: 'Candidate switched to another browser tab for 5 seconds',
    resolved: true,
    actionTaken: 'Warning issued automatically'
  },
  {
    id: 'pe2',
    examId: 'e1',
    candidateId: '4',
    eventType: 'multiple_faces',
    timestamp: '2024-12-15T05:30:00Z', // 11:00 AM IST
    severity: 'high',
    description: 'Multiple faces detected in camera feed - possibly getting help',
    resolved: false,
    evidenceUrl: '/evidence/pe2_screenshot.jpg'
  },
  {
    id: 'pe3',
    examId: 'e1',
    candidateId: '5',
    eventType: 'no_face',
    timestamp: '2024-12-15T04:45:00Z', // 10:15 AM IST
    severity: 'high',
    description: 'No face detected for more than 30 seconds',
    resolved: true,
    actionTaken: 'System alert sent, candidate returned to position'
  },
  {
    id: 'pe4',
    examId: 'e1',
    candidateId: '6',
    eventType: 'mobile_detected',
    timestamp: '2024-12-15T05:00:00Z', // 10:30 AM IST
    severity: 'high',
    description: 'Mobile phone detected near candidate workspace',
    resolved: false,
    evidenceUrl: '/evidence/pe4_mobile_detection.jpg'
  },
  {
    id: 'pe5',
    examId: 'e2',
    candidateId: '3',
    eventType: 'copy_paste',
    timestamp: '2024-12-10T04:30:00Z',
    severity: 'low',
    description: 'Copy-paste activity detected - likely formatting answer',
    resolved: true,
    actionTaken: 'Monitored - no violation confirmed'
  }
];

// SYSTEM CHECKS - PRE-EXAM TECHNICAL VERIFICATION
export const sampleSystemChecks: SystemCheck[] = [
  {
    id: 'sc1',
    candidateId: '3',
    examId: 'e1',
    timestamp: '2024-12-15T03:00:00Z', // 8:30 AM IST (30 mins before exam)
    cameraStatus: 'working',
    microphoneStatus: 'working',
    internetSpeed: 25.5,
    browserInfo: 'Chrome 120.0.6099.109',
    screenResolution: '1920x1080',
    systemSpecs: {
      os: 'Windows 11',
      browser: 'Chrome 120',
      ram: '8GB',
      processor: 'Intel Core i5-8250U'
    },
    overallStatus: 'pass'
  },
  {
    id: 'sc2',
    candidateId: '4',
    examId: 'e1',
    timestamp: '2024-12-15T03:10:00Z',
    cameraStatus: 'permission_denied',
    microphoneStatus: 'working',
    internetSpeed: 18.2,
    browserInfo: 'Firefox 121.0',
    screenResolution: '1366x768',
    systemSpecs: {
      os: 'Ubuntu 22.04',
      browser: 'Firefox 121',
      ram: '4GB',
      processor: 'AMD Ryzen 3 3200G'
    },
    overallStatus: 'warning'
  },
  {
    id: 'sc3',
    candidateId: '5',
    examId: 'e1',
    timestamp: '2024-12-15T03:05:00Z',
    cameraStatus: 'working',
    microphoneStatus: 'working',
    internetSpeed: 45.8,
    browserInfo: 'Chrome 120.0.6099.109',
    screenResolution: '2560x1440',
    systemSpecs: {
      os: 'macOS Sonoma 14.2',
      browser: 'Chrome 120',
      ram: '16GB',
      processor: 'Apple M2'
    },
    overallStatus: 'pass'
  }
];

// ID VERIFICATION - INDIAN IDENTITY DOCUMENTS
export const sampleIDVerifications: IDVerification[] = [
  {
    id: 'idv1',
    candidateId: '3',
    examId: 'e1',
    timestamp: '2024-12-15T02:45:00Z', // 8:15 AM IST
    idType: 'aadhaar',
    idNumber: '****-****-1234',
    verificationStatus: 'verified',
    faceMatchScore: 94.5,
    documentQuality: 'good',
    verifiedBy: '1' // Dr. Priya Sharma
  },
  {
    id: 'idv2',
    candidateId: '4',
    examId: 'e1',
    timestamp: '2024-12-15T02:50:00Z',
    idType: 'voter_id',
    idNumber: 'ABC****890',
    verificationStatus: 'pending',
    faceMatchScore: 87.2,
    documentQuality: 'average'
  },
  {
    id: 'idv3',
    candidateId: '5',
    examId: 'e1',
    timestamp: '2024-12-15T02:40:00Z',
    idType: 'driving_license',
    idNumber: 'MH12****5678',
    verificationStatus: 'verified',
    faceMatchScore: 96.1,
    documentQuality: 'good',
    verifiedBy: '2' // Prof. Rajesh Kumar
  },
  {
    id: 'idv4',
    candidateId: '6',
    examId: 'e1',
    timestamp: '2024-12-15T02:55:00Z',
    idType: 'aadhaar',
    idNumber: '****-****-5678',
    verificationStatus: 'rejected',
    faceMatchScore: 62.8,
    documentQuality: 'poor',
    verifiedBy: '1',
    rejectionReason: 'Face match score below threshold and poor document quality'
  }
];

// DASHBOARD ANALYTICS - UPDATED FOR INDIAN CONTEXT
export const dashboardStats = {
  totalExams: 24,
  activeExams: 3,
  totalCandidates: 247,
  completedAssessments: 156,
  averageScore: 73.2,
  proctoringViolations: 12,
  verificationPending: 8,
  topPerformingState: 'Karnataka',
  examTypes: {
    entrance: 8,
    semester: 12,
    competitive: 4
  }
};

// EXAM CALENDAR - INDIAN ACADEMIC CALENDAR
export const monthlyExamCalendar = [
  { date: '2024-12-15', title: 'JEE Mains 2025 Mock Test - Paper 1', time: '09:00 AM IST' },
  { date: '2024-12-18', title: 'NEET Mock Test - Biology Focus', time: '02:00 PM IST' },
  { date: '2024-12-20', title: 'Indian Civics and Constitution Test', time: '10:30 AM IST' },
  { date: '2024-12-22', title: 'Class 12 Mathematics Board Prep', time: '09:30 AM IST' },
  { date: '2024-12-25', title: 'GATE 2025 Mock - Computer Science', time: '02:30 PM IST' },
  { date: '2024-12-28', title: 'State Board Physics Final', time: '10:00 AM IST' },
  { date: '2025-01-02', title: 'Engineering Entrance Mock - Paper 2', time: '09:00 AM IST' },
  { date: '2025-01-05', title: 'Hindi Literature Assessment', time: '11:00 AM IST' }
];

// EXAM SUBMISSION TIMELINE - END-TO-END FLOW
export const examSubmissionFlow = {
  examId: 'e1',
  candidateId: '3',
  timeline: [
    {
      timestamp: '2024-12-15T02:45:00Z',
      event: 'ID Verification Completed',
      status: 'success',
      details: 'Aadhaar verified with 94.5% face match'
    },
    {
      timestamp: '2024-12-15T03:00:00Z',
      event: 'System Check Passed',
      status: 'success',
      details: 'Camera, microphone, internet speed all verified'
    },
    {
      timestamp: '2024-12-15T03:30:00Z',
      event: 'Exam Started',
      status: 'success',
      details: 'Timer started, first question displayed'
    },
    {
      timestamp: '2024-12-15T04:15:00Z',
      event: 'Proctoring Alert',
      status: 'warning',
      details: 'Tab switch detected - warning issued'
    },
    {
      timestamp: '2024-12-15T05:45:00Z',
      event: 'Answer Review Phase',
      status: 'info',
      details: 'Candidate reviewing answers before submission'
    },
    {
      timestamp: '2024-12-15T06:25:00Z',
      event: 'Exam Submitted',
      status: 'success',
      details: 'Submitted 5 minutes before deadline'
    },
    {
      timestamp: '2024-12-15T06:30:00Z',
      event: 'Auto-Evaluation Started',
      status: 'processing',
      details: 'MCQ answers being evaluated automatically'
    },
    {
      timestamp: '2024-12-15T06:35:00Z',
      event: 'Results Generated',
      status: 'success',
      details: 'Score: 245/300 (81.67%) - Rank: 1'
    }
  ]
};

// COMPREHENSIVE REPORTING DATA
export const comprehensiveReportData = {
  examId: 'e1',
  examTitle: 'JEE Mains 2025 Mock Test - Paper 1',
  totalCandidates: 5,
  appeared: 5,
  completed: 4,
  pending: 1,
  averageScore: 71.8,
  highestScore: 245,
  lowestScore: 156,
  passPercentage: 60,
  
  subjectWiseAnalysis: {
    'Computer Science': { avgScore: 73.2, difficulty: 'Medium' },
    'Mathematics': { avgScore: 68.4, difficulty: 'Hard' },
    'Geography': { avgScore: 76.8, difficulty: 'Easy' }
  },
  
  stateWisePerformance: {
    'Delhi': { candidates: 3, avgScore: 78.5 },
    'Maharashtra': { candidates: 2, avgScore: 63.2 }
  },
  
  proctoringInsights: {
    totalViolations: 4,
    resolved: 2,
    pending: 2,
    mostCommonViolation: 'multiple_faces',
    candidatesWithViolations: ['4', '5', '6']
  },
  
  technicalIssues: {
    systemCheckFailures: 1,
    cameraIssues: 1,
    internetConnectivity: 0,
    browserCompatibility: 0
  }
};
