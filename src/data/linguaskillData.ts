import { 
  LinguaskillTest, 
  LinguaskillQuestion, 
  CandidateInfo, 
  ModuleStatus,
  PreTestStep,
  TestSession,
  LinguaskillModule
} from '@/types/linguaskill';

// Sample Linguaskill Questions for each module
export const sampleLinguaskillQuestions: LinguaskillQuestion[] = [
  // Reading Module Questions
  {
    id: 'r4',
    type: 'open_gap_fill',
    module: 'reading',
    title: 'Working from Home',
    text: `Many people now work from home [1] least part of the time. This trend has [2] accelerated by recent global events. While working from home offers flexibility, it [3] requires good time management skills. Some people find it [4] to concentrate at home because of distractions. However, [5] who adapt well often report higher job satisfaction.`,
    gaps: 5,
    correctAnswer: ['at', 'been', 'also', 'difficult', 'those'],
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'r5',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Impact of Remote Work',
    text: `The shift to remote work has fundamentally changed how businesses operate around the world. Before the pandemic, remote work was considered a luxury or special arrangement for a select few employees. However, the global health crisis forced millions of workers to adapt to working from home almost overnight.

This dramatic change has revealed both advantages and challenges. On the positive side, many employees report increased productivity, better work-life balance, and reduced commuting stress. Companies have discovered they can maintain operations while reducing overhead costs such as office rent and utilities. The environmental benefits are also significant, with reduced carbon emissions from less commuting.

However, remote work is not without its difficulties. Many workers struggle with isolation and the lack of face-to-face interaction with colleagues. Communication can become more challenging, and some employees find it harder to separate their work and personal lives when both happen in the same space. Additionally, not all jobs can be performed remotely, creating inequality between different types of workers.

Looking ahead, it seems likely that hybrid work models will become the norm, combining the benefits of both remote and office-based work. Companies are investing in better technology and training to support this new way of working, while employees are developing new skills to thrive in a digital-first environment.`,
    options: [
      'Remote work has proven to be universally beneficial for all types of employees and businesses',
      'The pandemic accelerated the adoption of remote work, revealing both significant advantages and notable challenges',
      'Remote work is only suitable for technology companies and should not be adopted by traditional businesses',
      'The shift to remote work has been temporary and most companies will return to traditional office-based work'
    ],
    correctAnswer: 1,
    difficulty: 'B2',
    adaptiveWeight: 1.4
  },
  {
    id: 'r2',
    type: 'open_gap_fill',
    module: 'reading',
    title: 'My Favourite Newspaper',
    text: `I've read the same weekend newspaper for years. I make sure I manage to read it every week, or I feel out of touch. I started reading my favourite paper a couple of years [1]. [2] I agree with many things in it, the paper also challenges me. It makes me look at things in [3] different way. I usually find the reviews interesting - but I must admit some weeks I can't bear them as they've [4] written in a very sarcastic style. The regular writers have made me shake my head with anger too, on occasions, or smile [5] complete agreement. I've even posted comments on the site - something I thought I'd never do.`,
    gaps: 5,
    correctAnswer: ['ago', 'Although', 'a', 'been', 'in'],
    difficulty: 'B1',
    adaptiveWeight: 1.2
  },
  {
    id: 'r7',
    type: 'gap_fill_select',
    module: 'reading',
    title: 'Learning a New Language',
    text: `Learning a new language can be [1] challenging experience, but it's also incredibly rewarding. Many people [2] that the best way to learn is through immersion, [3] others prefer structured classroom learning. The key is to find a method that [4] your learning style and schedule. With consistent practice and [5], anyone can become proficient in a foreign language.`,
    gaps: 5,
    gapOptions: [
      ['a', 'an', 'the', 'some'],
      ['believe', 'thinks', 'consider', 'assume'],
      ['while', 'because', 'although', 'since'],
      ['suits', 'matches', 'fits', 'goes'],
      ['dedication', 'time', 'effort', 'patience']
    ],
    correctAnswer: ['an', 'believe', 'while', 'suits', 'dedication'],
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'r8',
    type: 'gap_fill_select',
    module: 'reading',
    title: 'Healthy Eating Habits',
    text: `Maintaining a healthy diet is [1] important for overall well-being. Experts [2] eating a variety of fruits and vegetables daily. It's also [3] to limit processed foods and sugary drinks. [4] people find it difficult to change their eating habits, small steps can [5] to significant improvements over time.`,
    gaps: 5,
    gapOptions: [
      ['very', 'quite', 'extremely', 'rather'],
      ['recommend', 'suggest', 'advise', 'propose'],
      ['essential', 'important', 'necessary', 'vital'],
      ['Although', 'While', 'Since', 'Because'],
      ['lead', 'result', 'contribute', 'amount']
    ],
    correctAnswer: ['extremely', 'recommend', 'essential', 'Although', 'lead'],
    difficulty: 'B1',
    adaptiveWeight: 1.2
  },
  {
    id: 'r3',
    type: 'missing_sentence_completion',
    module: 'reading',
    text: 'Climate change is one of the most pressing issues of our time. _____ Scientists worldwide are working on solutions. _____ However, individual actions also play a crucial role. _____ Together, we can make a significant impact.',
    dragDropOptions: [
      'It affects every aspect of our planet.',
      'Many people ignore the warning signs.',
      'Research shows alarming trends.'
    ],
    correctAnswer: ['0', '2', '1'],
    difficulty: 'B2',
    adaptiveWeight: 1.5
  },

  // Listening Module Questions
  {
    id: 'l1',
    type: 'listening_mcq_sentences',
    module: 'listening',
    text: 'Listen to the announcement and choose the correct sentence.',
    audioUrl: '/audio/announcement1.mp3',
    preparationTime: 10,
    options: [
      'The train to London is delayed by 15 minutes',
      'The train to London is cancelled',
      'The train to London is on time',
      'The train to London leaves from platform 3'
    ],
    correctAnswer: 0,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'l2',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen to the conversation and complete the sentences:\n1. The meeting is scheduled for _____ at _____ PM.\n2. The location has been changed to the _____ room.\n3. Please bring your _____ and notebook.',
    audioUrl: '/audio/meeting_conversation.mp3',
    preparationTime: 15,
    gaps: 3,
    correctAnswer: ['Tuesday', '3', 'conference'],
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'l3',
    type: 'table_completion_matching',
    module: 'listening',
    text: 'Listen to five different speakers talking about their hobbies. Match each speaker to their hobby.',
    audioUrl: '/audio/hobbies_speakers.mp3',
    preparationTime: 45,
    options: [
      'Photography', 'Cooking', 'Gardening', 'Reading', 'Swimming', 
      'Painting', 'Dancing', 'Cycling'
    ],
    correctAnswer: ['0', '1', '2', '3', '4'], // Speaker 1->Photography, Speaker 2->Cooking, etc.
    difficulty: 'B2',
    adaptiveWeight: 1.4
  },

  // Writing Module Questions
  {
    id: 'w1',
    type: 'essay_writing',
    module: 'writing',
    text: 'Some people believe that social media has a positive impact on society, while others think it has negative effects. Discuss both views and give your own opinion. Support your answer with examples and explanations.',
    wordCountMin: 150,
    wordCountMax: 400,
    difficulty: 'B2',
    adaptiveWeight: 2.0
  },

  // Speaking Module Questions
  {
    id: 's1',
    type: 'justify_opinion',
    module: 'speaking',
    text: 'Talk about your favorite season of the year. Explain why you prefer this season and give examples of activities you enjoy during this time.',
    preparationTime: 40,
    responseTime: 60,
    difficulty: 'B1',
    adaptiveWeight: 1.5
  },
  {
    id: 's2',
    type: 'summarize_and_discuss',
    module: 'speaking',
    text: 'Listen to this tutorial about time management techniques. Summarize the key points for someone who missed the session.',
    audioUrl: '/audio/time_management_tutorial.mp3',
    preparationTime: 60,
    responseTime: 90,
    difficulty: 'B2',
    adaptiveWeight: 1.8
  },
  {
    id: 's3',
    type: 'make_recommendation',
    module: 'speaking',
    text: 'Your friend is asking for advice about choosing between two job offers. Review the information provided and make a recommendation.',
    preparationTime: 45,
    responseTime: 75,
    difficulty: 'C1',
    adaptiveWeight: 2.0
  },
  {
    id: 's4',
    type: 'discuss_statement',
    module: 'speaking',
    text: '"Technology has made communication easier but less meaningful." Discuss both sides of this statement and give your opinion.',
    preparationTime: 60,
    responseTime: 120,
    difficulty: 'C1',
    adaptiveWeight: 2.2
  }
];

// Sample Candidate Information
export const sampleCandidateInfo: CandidateInfo = {
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya.sharma@email.com',
  dateOfBirth: '1995-08-15',
  nationality: 'Indian',
  nativeLanguage: 'Hindi',
  testCenter: 'Delhi Test Center',
  candidateNumber: 'LIN2024001',
  additionalInfo: {
    purpose: 'University admission',
    targetScore: 'B2',
    previousTestDate: '',
    specialRequirements: 'None'
  }
};

// Pre-test workflow steps
export const preTestSteps: PreTestStep[] = [
  {
    id: 'terms',
    title: 'Terms & Conditions',
    description: 'Accept the terms and conditions to proceed',
    component: 'TermsAndConditions',
    isRequired: true,
    status: 'pending'
  },
  {
    id: 'test_selection',
    title: 'Test Selection',
    description: 'Choose which modules to take',
    component: 'TestSelection',
    isRequired: true,
    status: 'pending'
  },
  {
    id: 'candidate_info',
    title: 'Candidate Information',
    description: 'Verify and complete your registration information',
    component: 'CandidateInfoForm',
    isRequired: true,
    status: 'pending'
  },
  {
    id: 'equipment_check',
    title: 'Equipment Check',
    description: 'Test your sound and microphone',
    component: 'EquipmentCheck',
    isRequired: true,
    status: 'pending'
  },
  {
    id: 'instructions',
    title: 'Test Instructions',
    description: 'Read the test instructions and navigation guide',
    component: 'TestInstructions',
    isRequired: true,
    status: 'pending'
  }
];

// Sample Linguaskill Test
export const sampleLinguaskillTest: LinguaskillTest = {
  id: 'linguaskill_001',
  title: 'Linguaskill General Test',
  modules: ['reading', 'listening', 'writing', 'speaking'],
  isAdaptive: true,
  maxDuration: 180, // 3 hours total
  questions: sampleLinguaskillQuestions,
  candidateInfo: sampleCandidateInfo,
  status: 'not_started',
  moduleStatuses: {
    reading: {
      status: 'not_started',
      currentQuestionIndex: 0,
      answers: {}
    },
    listening: {
      status: 'not_started',
      currentQuestionIndex: 0,
      answers: {}
    },
    writing: {
      status: 'not_started',
      currentQuestionIndex: 0,
      answers: {}
    },
    speaking: {
      status: 'not_started',
      currentQuestionIndex: 0,
      answers: {}
    }
  }
};

// Sample Test Session
export const sampleTestSession: TestSession = {
  id: 'session_001',
  testId: 'linguaskill_001',
  candidateId: 'candidate_001',
  startTime: new Date().toISOString(),
  currentStep: 'terms',
  preTestSteps: preTestSteps,
  equipmentChecks: [
    {
      type: 'sound',
      status: 'not_tested'
    },
    {
      type: 'microphone',
      status: 'not_tested'
    }
  ],
  moduleAttempts: {
    reading: {
      moduleId: 'reading',
      startTime: '',
      questions: sampleLinguaskillQuestions.filter(q => q.module === 'reading'),
      responses: {}
    },
    listening: {
      moduleId: 'listening',
      startTime: '',
      questions: sampleLinguaskillQuestions.filter(q => q.module === 'listening'),
      responses: {}
    },
    writing: {
      moduleId: 'writing',
      startTime: '',
      questions: sampleLinguaskillQuestions.filter(q => q.module === 'writing'),
      responses: {}
    },
    speaking: {
      moduleId: 'speaking',
      startTime: '',
      questions: sampleLinguaskillQuestions.filter(q => q.module === 'speaking'),
      responses: {}
    }
  },
  violations: []
};

// Module duration limits (in minutes)
export const moduleDurations: Record<LinguaskillModule, number> = {
  reading: 59,
  listening: 59,
  writing: 45,
  speaking: 16
};

// CEFR Level mappings
export const cefrLevels = {
  'A1': { name: 'Beginner', score: 82 },
  'A2': { name: 'Elementary', score: 102 },
  'B1': { name: 'Intermediate', score: 122 },
  'B2': { name: 'Upper Intermediate', score: 142 },
  'C1': { name: 'Advanced', score: 162 },
  'C2': { name: 'Proficient', score: 180 }
};

// Question type configurations
export const questionTypeConfigs = {
  // Reading configurations
  read_and_select: {
    name: 'Read and Select',
    description: 'Read a short text and choose the correct option',
    timeLimit: 60,
    interaction: 'dropdown'
  },
  open_gap_fill: {
    name: 'Open Gap-Fill',
    description: 'Type one word into each blank space',
    timeLimit: 90,
    interaction: 'typing'
  },
  missing_sentence_completion: {
    name: 'Missing Sentence Completion',
    description: 'Drag sentences to fill the gaps',
    timeLimit: 120,
    interaction: 'drag_drop'
  },
  
  // Listening configurations
  listening_mcq_sentences: {
    name: 'Multiple Choice (Sentences)',
    description: 'Listen and select the correct sentence',
    preparationTime: 10,
    maxPlays: 2,
    interaction: 'click'
  },
  sentence_completion_typing: {
    name: 'Sentence Completion',
    description: 'Listen and type 1-3 words to complete sentences',
    preparationTime: 45,
    maxPlays: 2,
    interaction: 'typing'
  },
  
  // Writing configurations
  essay_writing: {
    name: 'Essay Writing',
    description: 'Write an essay on the given topic',
    timeLimit: 45 * 60, // 45 minutes in seconds
    features: ['word_counter', 'cut_copy_paste', 'no_spell_check']
  },
  
  // Speaking configurations
  justify_opinion: {
    name: 'Justify an Opinion',
    description: 'Talk about a topic and provide reasons',
    preparationTime: 40,
    responseTime: 60
  },
  summarize_and_discuss: {
    name: 'Summarize and Discuss',
    description: 'Summarize key points and answer follow-up questions',
    preparationTime: 60,
    responseTime: 90
  }
};
