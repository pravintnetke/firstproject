import { 
  LinguaskillTest, 
  LinguaskillQuestion, 
  CandidateInfo, 
  ModuleStatus,
  PreTestStep,
  TestSession,
  LinguaskillModule
} from '@/types/linguaskill';

// Al Jamea Grade 6 English Test - Linguaskill Format
export const alJameaGrade6Questions: LinguaskillQuestion[] = [
  // Listening Module - Part 1: Picture-based MCQ (Q1-10)
  {
    id: 'aj_l1',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'Listen to the description and choose the correct picture. The woman is wearing a striped purple dress with white shoes. She\'s holding a black umbrella while walking her brown poodle.',
    audioUrl: '/audio/aj_grade6_q1.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 0,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l2',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'Listen and identify the correct picture. A boy is flying a yellow kite shaped like a diamond in the park. Two birds are flying higher than the kite.',
    audioUrl: '/audio/aj_grade6_q2.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 3,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l3',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'Listen to the description. In the library, a librarian is stacking books while a girl in a pink headphone reads at the table. A boy nearby is using a laptop.',
    audioUrl: '/audio/aj_grade6_q3.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 2,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l4',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'At the beach, a man in blue shorts is building a sandcastle while a woman in a hat takes photos. A seagull is stealing their chips.',
    audioUrl: '/audio/aj_grade6_q4.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l5',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'The chef is chopping vegetables while wearing a tall white hat. On the stove, a pot is boiling but no oven is being used.',
    audioUrl: '/audio/aj_grade6_q5.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 3,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l6',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'In the garden, an old man waters sunflowers with a green can. A black cat watches from the fence behind him.',
    audioUrl: '/audio/aj_grade6_q6.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 0,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l7',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'At the zoo, a zookeeper feeds bananas to a sitting elephant. Two monkeys are swinging in the background.',
    audioUrl: '/audio/aj_grade6_q7.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l8',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'In the music class, a teacher plays guitar while two students clap. One student has drumsticks but isn\'t using them.',
    audioUrl: '/audio/aj_grade6_q8.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l9',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'At the market, a vendor sells oranges and apples. A customer in a yellow sari examines mangoes while holding a woven basket.',
    audioUrl: '/audio/aj_grade6_q9.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 3,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l10',
    type: 'listening_mcq_pictures',
    module: 'listening',
    text: 'A postal worker rides a red bicycle past a bakery. A delivery truck is parked outside the pharmacy across the street.',
    audioUrl: '/audio/aj_grade6_q10.mp3',
    preparationTime: 10,
    options: ['Picture A', 'Picture B', 'Picture C', 'Picture D'],
    correctAnswer: 0,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },

  // Listening Module - Part 2: Gap Fill with specific details (Q11-20)
  {
    id: 'aj_l11',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and complete the sentence:\nThe school canteen closes at ______ in the afternoon.',
    audioUrl: '/audio/aj_grade6_q11.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['2:30', '2.30', 'two thirty'],
    difficulty: 'B1',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_l12',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and write the answer:\nThe new student\'s favorite colour is ______.',
    audioUrl: '/audio/aj_grade6_q12.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['purple'],
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_l13',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and complete:\nTheir science project is due on ______.',
    audioUrl: '/audio/aj_grade6_q13.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['March 15th', 'March 15', '15th March', '15 March'],
    difficulty: 'B1',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_l14',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and write the number:\nA movie ticket for children costs ______ rupees.',
    audioUrl: '/audio/aj_grade6_q14.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['120', 'one hundred twenty'],
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_l15',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and complete:\nThe history exam will cover Chapter ______.',
    audioUrl: '/audio/aj_grade6_q15.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['7', 'seven'],
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },

  // Listening Module - Part 2 continued (Q16-Q20)
  {
    id: 'aj_l16',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and complete:\nThe football match starts at ______ past eleven.',
    audioUrl: '/audio/aj_grade6_q16.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['quarter', 'a quarter'],
    difficulty: 'B1',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_l17',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and write:\nThe librarian\'s office is on the ______ floor.',
    audioUrl: '/audio/aj_grade6_q17.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['third', '3rd'],
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_l18',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and complete:\nThey need ______ kilograms of flour for baking.',
    audioUrl: '/audio/aj_grade6_q18.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['two', '2'],
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_l19',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and write:\nThe post office is opposite the ______.',
    audioUrl: '/audio/aj_grade6_q19.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['bank'],
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_l20',
    type: 'sentence_completion_typing',
    module: 'listening',
    text: 'Listen and complete:\nHer sister was born in ______.',
    audioUrl: '/audio/aj_grade6_q20.mp3',
    preparationTime: 10,
    gaps: 1,
    correctAnswer: ['August'],
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },

  // Listening Module - Part 3: Short dialogues (Q21-25)
  {
    id: 'aj_l21',
    type: 'listening_mcq_sentences',
    module: 'listening',
    text: 'Listen to the conversation:\nMan: "Should we meet at 5:00 or 5:30 for the concert?"\nWoman: "Let\'s meet at 5:15—I need extra time to park."\nWhen will they meet?',
    audioUrl: '/audio/aj_grade6_q21.mp3',
    preparationTime: 15,
    options: ['5:00', '5:15', '5:30', '5:45'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_l22',
    type: 'listening_mcq_sentences',
    module: 'listening',
    text: 'Listen to the dialogue:\nBoy: "Can I borrow your science notes?"\nGirl: "Sure, but I need them back by Thursday."\nWhen does the girl need her notes back?',
    audioUrl: '/audio/aj_grade6_q22.mp3',
    preparationTime: 15,
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    correctAnswer: 3,
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_l23',
    type: 'listening_mcq_sentences',
    module: 'listening',
    text: 'Listen to the conversation:\nTeacher: "Is your science project about plants or animals?"\nStudent: "It\'s actually about ocean pollution."\nWhat is the project about?',
    audioUrl: '/audio/aj_grade6_q23.mp3',
    preparationTime: 15,
    options: ['Plants', 'Animals', 'Ocean pollution', 'Air quality'],
    correctAnswer: 2,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_l24',
    type: 'listening_mcq_sentences',
    module: 'listening',
    text: 'Listen to the dialogue:\nGirl: "Should I wear my red dress or blue jeans today?"\nMother: "The blue jeans look better for hiking."\nWhat did mother recommend?',
    audioUrl: '/audio/aj_grade6_q24.mp3',
    preparationTime: 15,
    options: ['Red dress', 'Blue jeans', 'Formal suit', 'Skirt'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_l25',
    type: 'listening_mcq_sentences',
    module: 'listening',
    text: 'Listen to the conversation:\nWoman: "Did you finish the assignment on the sofa or at the desk?"\nBoy: "I did it at the kitchen table."\nWhere was the assignment done?',
    audioUrl: '/audio/aj_grade6_q25.mp3',
    preparationTime: 15,
    options: ['Sofa', 'Desk', 'Kitchen table', 'Bed'],
    correctAnswer: 2,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },

  // Listening Module - Part 4: Extended listening with reasoning (Q26-Q40)
  {
    id: 'aj_l26',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Listen to the passage: "The museum tour group took the stairs instead of the elevator. The guide explained the elevator was under repair."\nWhy didn\'t they use the elevator?',
    audioUrl: '/audio/aj_grade6_q26.mp3',
    preparationTime: 20,
    options: ['Too crowded', 'Under repair', 'Energy saving', 'Safety drill'],
    correctAnswer: 1,
    difficulty: 'B2',
    adaptiveWeight: 1.5
  },
  {
    id: 'aj_l27',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Listen: "Lucas bought a red bicycle helmet. His old one cracked during a fall last week."\nWhy did Lucas get a new helmet?',
    audioUrl: '/audio/aj_grade6_q27.mp3',
    preparationTime: 20,
    options: ['Colour preference', 'Old one cracked', 'Birthday gift', 'School rule'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.4
  },
  {
    id: 'aj_l28',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Listen: "The soccer team practiced indoors. Heavy rain made the field too muddy to use."\nWhy did they practice indoors?',
    audioUrl: '/audio/aj_grade6_q28.mp3',
    preparationTime: 20,
    options: ['Muddy field', 'Coach\'s order', 'New strategy', 'Player injury'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.4
  },
  {
    id: 'aj_l29',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Listen: "Priya added extra sugar to the lemonade. Her brother mentioned it was too sour yesterday."\nWhy did Priya add more sugar?',
    audioUrl: '/audio/aj_grade6_q29.mp3',
    preparationTime: 20,
    options: ['Brother\'s complaint', 'Recipe instruction', 'Sweet tooth', 'Health advice'],
    correctAnswer: 0,
    difficulty: 'B2',
    adaptiveWeight: 1.5
  },
  {
    id: 'aj_l30',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Listen: "The concert tickets sold out quickly. The band had won a music award last month."\nWhy did tickets sell out fast?',
    audioUrl: '/audio/aj_grade6_q30.mp3',
    preparationTime: 20,
    options: ['Low price', 'Band won award', 'Small venue', 'Holiday season'],
    correctAnswer: 1,
    difficulty: 'B2',
    adaptiveWeight: 1.5
  },
  {
    id: 'aj_l31',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Listen to the passage and answer: What was the main reason for the change?',
    audioUrl: '/audio/aj_grade6_q31.mp3',
    preparationTime: 20,
    options: ['Weather conditions', 'Time constraints', 'Budget issues', 'Safety concerns'],
    correctAnswer: 3,
    difficulty: 'B2',
    adaptiveWeight: 1.6
  },
  {
    id: 'aj_l32',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Listen and identify the speaker\'s purpose.',
    audioUrl: '/audio/aj_grade6_q32.mp3',
    preparationTime: 20,
    options: ['To inform', 'To persuade', 'To entertain', 'To warn'],
    correctAnswer: 0,
    difficulty: 'B2',
    adaptiveWeight: 1.6
  },
  {
    id: 'aj_l33',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Based on the passage, what can you infer about the character?',
    audioUrl: '/audio/aj_grade6_q33.mp3',
    preparationTime: 20,
    options: ['They are organized', 'They are forgetful', 'They are creative', 'They are shy'],
    correctAnswer: 0,
    difficulty: 'B2',
    adaptiveWeight: 1.7
  },
  {
    id: 'aj_l34',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'What is the most likely outcome of the situation described?',
    audioUrl: '/audio/aj_grade6_q34.mp3',
    preparationTime: 20,
    options: ['Success', 'Delay', 'Cancellation', 'Compromise'],
    correctAnswer: 3,
    difficulty: 'B2',
    adaptiveWeight: 1.7
  },
  {
    id: 'aj_l35',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Listen and determine the relationship between the speakers.',
    audioUrl: '/audio/aj_grade6_q35.mp3',
    preparationTime: 20,
    options: ['Teacher and student', 'Friends', 'Parent and child', 'Colleagues'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.5
  },
  {
    id: 'aj_l36',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'What problem is being discussed in the passage?',
    audioUrl: '/audio/aj_grade6_q36.mp3',
    preparationTime: 20,
    options: ['Transportation', 'Communication', 'Scheduling', 'Equipment'],
    correctAnswer: 2,
    difficulty: 'B2',
    adaptiveWeight: 1.6
  },
  {
    id: 'aj_l37',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'According to the speaker, what is the best solution?',
    audioUrl: '/audio/aj_grade6_q37.mp3',
    preparationTime: 20,
    options: ['Wait and see', 'Take immediate action', 'Ask for help', 'Change the plan'],
    correctAnswer: 1,
    difficulty: 'B2',
    adaptiveWeight: 1.6
  },
  {
    id: 'aj_l38',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'What emotion is the speaker expressing?',
    audioUrl: '/audio/aj_grade6_q38.mp3',
    preparationTime: 20,
    options: ['Excitement', 'Disappointment', 'Confusion', 'Relief'],
    correctAnswer: 3,
    difficulty: 'B1',
    adaptiveWeight: 1.5
  },
  {
    id: 'aj_l39',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'What is the main topic of the conversation?',
    audioUrl: '/audio/aj_grade6_q39.mp3',
    preparationTime: 20,
    options: ['School activities', 'Family plans', 'Sports events', 'Study habits'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.4
  },
  {
    id: 'aj_l40',
    type: 'longer_listening_task',
    module: 'listening',
    text: 'Based on the information given, what will likely happen next?',
    audioUrl: '/audio/aj_grade6_q40.mp3',
    preparationTime: 20,
    options: ['They will continue as planned', 'They will make adjustments', 'They will cancel', 'They will postpone'],
    correctAnswer: 1,
    difficulty: 'B2',
    adaptiveWeight: 1.7
  },

  // Speaking Module - Personal Questions
  {
    id: 'aj_s1',
    type: 'justify_opinion',
    module: 'speaking',
    text: 'Answer the following personal questions in 2-3 sentences each:\n1. What is your name and how old are you?\n2. Where do you live?\n3. What is your favorite subject in school and why?\n4. How do you usually travel to school?\n5. What meal do you enjoy cooking or eating most?',
    preparationTime: 30,
    responseTime: 300,
    difficulty: 'A2',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_s2',
    type: 'justify_opinion',
    module: 'speaking',
    text: 'Look at the picture and describe what you see. Talk about:\n- What is happening in the picture?\n- Who are the people and what are they doing?\n- What is the setting or location?\n- How do you think the people are feeling?',
    preparationTime: 60,
    responseTime: 300,
    difficulty: 'B1',
    adaptiveWeight: 1.5
  },
  {
    id: 'aj_s3',
    type: 'discuss_statement',
    module: 'speaking',
    text: 'Topic: "Reading books is better than watching movies."\nDiscuss this statement. Give your opinion and explain why you agree or disagree. Provide examples to support your answer.',
    preparationTime: 60,
    responseTime: 180,
    difficulty: 'B2',
    adaptiveWeight: 1.8
  },

  // Reading Module - Section C Part 1: Interpreting Notices (10 questions)
  {
    id: 'aj_r1',
    type: 'read_and_select',
    module: 'reading',
    title: 'Gym Notice',
    text: 'Sign at Gym:\n"Members must wipe equipment after use. Towels provided at reception."\n\nThis notice means members should:',
    options: ['bring their own towels', 'avoid using equipment', 'clean machines after exercising', 'only use equipment in the morning'],
    correctAnswer: 2,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_r2',
    type: 'read_and_select',
    module: 'reading',
    title: 'Bus Stop Notice',
    text: 'Bus Stop Notice:\n"Route 42 suspended during road repairs. Use temporary stop 200m ahead."\n\nPassengers should:',
    options: ['wait longer at this stop', 'walk to the new stop', 'take a different route', 'complain to the driver'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_r3',
    type: 'read_and_select',
    module: 'reading',
    title: 'Restaurant Menu',
    text: 'Restaurant Menu:\n"Gluten-free options marked with GF. Ask staff about allergens."\n\nCustomers learn that:',
    options: ['all dishes are gluten-free', 'special markings indicate GF items', 'staff will not discuss ingredients', 'extra charges apply for GF meals'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_r4',
    type: 'read_and_select',
    module: 'reading',
    title: 'School Noticeboard',
    text: 'School Noticeboard:\n"Art exhibition moved to Auditorium. Original venue unavailable due to repairs."\n\nStudents should go to the:',
    options: ['library', 'auditorium', 'classroom', 'sports hall'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_r5',
    type: 'read_and_select',
    module: 'reading',
    title: 'Parking Sign',
    text: 'Parking Sign:\n"Reserved for electric vehicles only. Others will be towed."\n\nThis means:',
    options: ['All cars can park here briefly', 'Only EVs may use this space', 'Towing service available here', 'Parking free for hybrid cars'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_r6',
    type: 'read_and_select',
    module: 'reading',
    title: 'Supermarket Poster',
    text: 'Supermarket Poster:\n"Return faulty items within 7 days with receipt for full refund."\n\nCustomers must:',
    options: ['keep damaged goods', 'show proof of purchase', 'wait 14 days for returns', 'accept store credit only'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_r7',
    type: 'read_and_select',
    module: 'reading',
    title: 'Online Exam Instructions',
    text: 'Online Exam Instructions:\n"Webcam must remain on throughout the test. Closing it voids your attempt."\n\nStudents must:',
    options: ['disable their microphone', 'keep camera operational', 'take breaks frequently', 'hide their screen'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_r8',
    type: 'read_and_select',
    module: 'reading',
    title: 'Airport Announcement',
    text: 'Airport Announcement:\n"Liquids over 100ml not permitted in carry-on luggage. Place them in checked bags."\n\nTravelers should:',
    options: ['pack large bottles in suitcase', 'carry all liquids openly', 'discard containers over 100ml', 'buy liquids after security'],
    correctAnswer: 0,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_r9',
    type: 'read_and_select',
    module: 'reading',
    title: 'Cinema Poster',
    text: 'Cinema Poster:\n"Children under 15 must be accompanied by an adult for horror films."\n\nThis rule applies to:',
    options: ['all movie genres', 'horror films only', 'children over 15', 'adult viewers'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },
  {
    id: 'aj_r10',
    type: 'read_and_select',
    module: 'reading',
    title: 'Library Notice',
    text: 'Library Notice:\n"Silent study area. Mobile phones must be switched off or on silent mode."\n\nIn this area, visitors should:',
    options: ['talk quietly', 'turn off or silence phones', 'use headphones', 'leave immediately'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.0
  },

  // Reading Module - Section C Part 2: Reading Comprehension (Q11-Q15)
  {
    id: 'aj_r11',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Read the passage about three photography enthusiasts:\n\nAlex: I started documenting street art in my city last year. My blog features photos of murals and interviews with artists. I always note the exact locations and materials used (like spray paint vs. stencils) because followers want to visit these spots. My brother helps me edit videos showing the creation process. The most rewarding part is discovering hidden artworks through readers\' tips.\n\nPriya: My focus is wildlife photography. I post weekly from nature reserves, explaining how I capture animals without disturbing them. At first, I hesitated to share my work, but a teacher urged me to try. My "bird nesting" series went viral! I\'ve started adding short audio clips of animal sounds, which viewers love. This hobby combines my passion for nature and tech skills.\n\nOmar: I use my blog as a visual diary of architectural wonders. Each post compares old and new buildings in my neighborhood. What began as a school project now has international readers who suggest historical facts about structures. When exams pile up, I post less frequently, but I always return – this blog is my creative anchor.\n\nWho provides technical assistance to the blogger?',
    options: ['Alex\'s brother', 'Priya', 'Omar', 'Alex'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.4
  },
  {
    id: 'aj_r12',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Based on the passage about the three photographers:\n\nWhich blog includes audio elements?',
    options: ['Alex\'s', 'Priya\'s', 'Omar\'s', 'Priya and Alex\'s'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r13',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Based on the passage about the three photographers:\n\nWho started blogging for a school-related reason?',
    options: ['Alex', 'Priya', 'Omar', 'All three'],
    correctAnswer: 2,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r14',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Based on the passage about the three photographers:\n\nWhich blogger mentions audience-sourced information?',
    options: ['Alex', 'Priya', 'Omar', 'Alex and Omar'],
    correctAnswer: 3,
    difficulty: 'B1',
    adaptiveWeight: 1.4
  },
  {
    id: 'aj_r15',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Based on the passage about the three photographers:\n\nWho overcame initial doubts about sharing work?',
    options: ['Alex', 'Priya', 'Omar', 'Priya and Omar'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r16',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Based on the passage about the three photographers:\n\nWhat do Alex\'s posts always include about artworks?',
    options: ['Artist interviews', 'Location details', 'Video edits', 'Historical facts'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r17',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Based on the passage about the three photographers:\n\nWho balances blogging with academic pressures?',
    options: ['Alex', 'Priya', 'Omar', 'All three'],
    correctAnswer: 2,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r18',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Based on the passage about the three photographers:\n\nWhich blogger\'s content went viral?',
    options: ['Alex\'s mural videos', 'Priya\'s bird series', 'Omar\'s school project', 'None'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r19',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Based on the passage about the three photographers:\n\nWhat type of photography does Priya focus on?',
    options: ['Street art', 'Wildlife', 'Architecture', 'Portrait'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_r20',
    type: 'extended_reading',
    module: 'reading',
    title: 'Young Photographers\' Journals',
    text: 'Based on the passage about the three photographers:\n\nWhat does Omar compare in his blog posts?',
    options: ['Artists and styles', 'Old and new buildings', 'Camera equipment', 'Different cities'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },

  // Reading Module - Section C Part 3: Extended Reading (Q21-Q30)
  {
    id: 'aj_r21',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Green Earth Initiative',
    text: 'Read the passage:\n\nIn 2024, a team of scientists and activists from Brazil, Japan and Kenya launched the Green Earth Initiative to combat deforestation. Dr. Amina Mwangi, a Kenyan ecologist, leads the project, which uses AI-powered drones to monitor rainforests in the Amazon and Congo Basin.\n\nThe initiative partners with Indigenous communities like the Yanomami tribe in Brazil to plant 10 million trees annually. In Japan, students from Tokyo University developed an app called EcoTrack to crowdsource deforestation alerts. "Global problems need global solutions," says Dr. Mwangi.\n\nA breakthrough came in March 2025 when the team discovered a new carbon-absorbing moss species in Mount Kenya. This moss, named Bryum viridis, can store 20% more CO₂ than ordinary plants. The project now expands to Indonesia\'s peatlands, funded by a UN grant.\n\nWho leads the Green Earth Initiative?',
    options: ['A Yanomami elder', 'Dr. Amina Mwangi', 'A Tokyo University student', 'A UN official'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.4
  },
  {
    id: 'aj_r22',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Green Earth Initiative',
    text: 'Based on the Green Earth Initiative passage:\n\nWhat technology do they use to monitor forests?',
    options: ['Satellite imagery', 'AI-powered drones', 'Ground sensors', 'Human patrols'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r23',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Green Earth Initiative',
    text: 'Based on the Green Earth Initiative passage:\n\nWhich community partners with the initiative in Brazil?',
    options: ['Maasai', 'Yanomami', 'Inuit', 'Sami'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r24',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Green Earth Initiative',
    text: 'Based on the Green Earth Initiative passage:\n\nWhat unique discovery did the team make in 2025?',
    options: ['A renewable energy source', 'A carbon-absorbing moss', 'A new rainforest animal', 'A water purification method'],
    correctAnswer: 1,
    difficulty: 'B2',
    adaptiveWeight: 1.5
  },
  {
    id: 'aj_r25',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Green Earth Initiative',
    text: 'Based on the Green Earth Initiative passage:\n\nWhich country\'s peatlands are part of the expanded project?',
    options: ['Indonesia', 'Canada', 'Russia', 'Australia'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r26',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Amazon Rainforest',
    text: 'Read the passage:\n\nThe Amazon Rainforest, spanning nine countries in South America, covers over 5.5 million square kilometers. It produces 20% of the world\'s oxygen and houses 10% of all known species, including jaguars, pink river dolphins and 16,000 tree varieties. Indigenous tribes like the Yanomami have lived here sustainably for millennia.\n\nEcotourism has grown rapidly, with visitors hiking, birdwatching, or exploring the Amazon River. Biologists study its biodiversity, calling it a "living laboratory" for climate research.\n\nSadly, deforestation threatens the Amazon. Illegal logging, cattle ranching and wildfires destroy 20,000 square kilometers annually. This disrupts rainfall patterns and releases stored carbon, worsening global warming.\n\nConservation groups like WWF and local governments now enforce stricter laws. Reforestation projects and "carbon credit" programs aim to balance economic needs with ecological preservation.\n\nHow much of the world\'s oxygen does the Amazon produce?',
    options: ['5%', '10%', '20%', '30%'],
    correctAnswer: 2,
    difficulty: 'A2',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_r27',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Amazon Rainforest',
    text: 'Based on the Amazon Rainforest passage:\n\nWhich activity is NOT mentioned as part of Amazon ecotourism?',
    options: ['Birdwatching', 'Hiking', 'Scuba diving', 'River exploration'],
    correctAnswer: 2,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r28',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Amazon Rainforest',
    text: 'Based on the Amazon Rainforest passage:\n\nWhat is the main threat to the Amazon mentioned?',
    options: ['Tourism', 'Deforestation', 'Climate change', 'Pollution'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r29',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Amazon Rainforest',
    text: 'Based on the Amazon Rainforest passage:\n\nHow much area is destroyed annually by deforestation?',
    options: ['5,000 sq km', '10,000 sq km', '20,000 sq km', '50,000 sq km'],
    correctAnswer: 2,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r30',
    type: 'extended_reading',
    module: 'reading',
    title: 'The Amazon Rainforest',
    text: 'Based on the Amazon Rainforest passage:\n\nWhat solution is mentioned to balance economic and ecological needs?',
    options: ['Banning all tourism', 'Carbon credit programs', 'Building more cities', 'Stopping all research'],
    correctAnswer: 1,
    difficulty: 'B2',
    adaptiveWeight: 1.5
  },

  // Reading Module - Section C Part 4: Cloze Passage (Q36-Q45)
  {
    id: 'aj_r36',
    type: 'read_and_select',
    module: 'reading',
    title: 'Alan Turing: The Codebreaker',
    text: 'Alan Turing, born in 1912 in England, was a mathematician and computer scientist. During World War II, he played a crucial role in breaking German codes, which 36________ the war\'s outcome.\n\nChoose the correct word:',
    options: ['shorten', 'shortened', 'shortening', 'shortens'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r37',
    type: 'read_and_select',
    module: 'reading',
    title: 'Alan Turing: The Codebreaker',
    text: 'Turing laid the foundation for modern computing with his concept of the Turing Machine, a theoretical model that 37________ how computers process information.\n\nChoose the correct word:',
    options: ['redefined', 'redefines', 'redefining', 'redefine'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r38',
    type: 'read_and_select',
    module: 'reading',
    title: 'Alan Turing: The Codebreaker',
    text: 'Despite his genius, he faced persecution for being gay. In 1952, he was arrested and chemically castrated, yet he 38________ his research until his tragic death in 1954.\n\nChoose the correct word:',
    options: ['continues', 'continued', 'continuing', 'continue'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r39',
    type: 'read_and_select',
    module: 'reading',
    title: 'Alan Turing: The Codebreaker',
    text: 'Today, Turing is celebrated as a pioneer of artificial intelligence. His legacy 39________ debates about ethics in technology and LGBTQ+ rights.\n\nChoose the correct word:',
    options: ['fuels', 'fueled', 'fueling', 'fuel'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r40',
    type: 'read_and_select',
    module: 'reading',
    title: 'Alan Turing: The Codebreaker',
    text: 'Many argue that his persecution 40________ scientific progress for years, as his later ideas were never fully explored.\n\nChoose the correct word:',
    options: ['delayed', 'delays', 'delaying', 'delay'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r41',
    type: 'read_and_select',
    module: 'reading',
    title: 'Rosalind Franklin: The Overlooked Pioneer',
    text: 'Rosalind Franklin, born in 1920 in London, was a chemist whose work 41________ the discovery of DNA\'s double-helix structure.\n\nChoose the correct word:',
    options: ['enabled', 'enables', 'enabling', 'enable'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r42',
    type: 'read_and_select',
    module: 'reading',
    title: 'Rosalind Franklin: The Overlooked Pioneer',
    text: 'Using X-ray crystallography, she captured Photo 51, a critical image that 42________ crucial clues about DNA\'s shape.\n\nChoose the correct word:',
    options: ['revealed', 'reveals', 'revealing', 'reveal'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r43',
    type: 'read_and_select',
    module: 'reading',
    title: 'Rosalind Franklin: The Overlooked Pioneer',
    text: 'Despite her groundbreaking research, Franklin 43________ full recognition during her lifetime.\n\nChoose the correct word:',
    options: ['never received', 'never receives', 'had never received', 'has never received'],
    correctAnswer: 0,
    difficulty: 'B2',
    adaptiveWeight: 1.4
  },
  {
    id: 'aj_r44',
    type: 'read_and_select',
    module: 'reading',
    title: 'Rosalind Franklin: The Overlooked Pioneer',
    text: 'Today, historians and scientists 44________ her role as essential to one of biology\'s greatest breakthroughs.\n\nChoose the correct word:',
    options: ['argue', 'argues', 'argued', 'arguing'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_r45',
    type: 'read_and_select',
    module: 'reading',
    title: 'Rosalind Franklin: The Overlooked Pioneer',
    text: 'Franklin\'s story 45________ the importance of ethical collaboration and the need to acknowledge underrepresented voices in science.\n\nChoose the correct word:',
    options: ['highlights', 'highlighted', 'highlighting', 'highlight'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },

  // Writing Module - Section D
  {
    id: 'aj_w1',
    type: 'essay_writing',
    module: 'writing',
    text: 'Guided Writing - Email (5 marks):\n\nYou want to organise a weekend hiking trip with your colleague, Priya.\nWrite an email to Priya in under 100 words. Include:\n- Invitation for Saturday/Sunday hiking\n- Mention the trail location (e.g., Green Valley Trail)\n- Suggest what to bring (e.g., water, snacks)',
    wordCountMin: 50,
    wordCountMax: 100,
    difficulty: 'B1',
    adaptiveWeight: 1.5
  },
  {
    id: 'aj_w2',
    type: 'essay_writing',
    module: 'writing',
    text: 'Picture Composition (10 marks):\n\nLook at the picture. Describe in 100 words or more what you see in the picture.\nInclude details about:\n- What is happening\n- Who is in the picture\n- The setting and atmosphere\n- Your observations',
    wordCountMin: 100,
    wordCountMax: 150,
    difficulty: 'B1',
    adaptiveWeight: 1.6
  },
  {
    id: 'aj_w3',
    type: 'essay_writing',
    module: 'writing',
    text: 'Story Writing (15 marks):\n\nLook at the given picture. Write a story in 120 words or more.\nYour story should have:\n- A clear beginning, middle, and end\n- Interesting characters\n- Descriptive language\n- A meaningful conclusion',
    wordCountMin: 120,
    wordCountMax: 200,
    difficulty: 'B2',
    adaptiveWeight: 1.8
  },

  // Grammar Module - Section E (15 marks)
  {
    id: 'aj_g1',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Tenses',
    text: 'The Paris Climate Agreement ___ in 2016 to combat global warming.',
    options: ['was signed', 'signed', 'is signed', 'had signed'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_g2',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Tenses',
    text: 'Researchers ___ groundbreaking discoveries about Mars\' atmosphere last month.',
    options: ['announce', 'announced', 'announces', 'announcing'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_g3',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Degrees of Comparison',
    text: 'Artificial intelligence is becoming ___ at diagnosing diseases than humans.',
    options: ['more accurate', 'most accurate', 'accurater', 'accurate'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_g4',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Degrees of Comparison',
    text: 'The Pacific Ocean is ___ than the Atlantic Ocean.',
    options: ['more deep', 'deeper', 'deepest', 'most deep'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_g5',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Prepositions',
    text: 'The cat slept ___ the bed.',
    options: ['under', 'above', 'between', 'through'],
    correctAnswer: 0,
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_g6',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Determiners',
    text: 'There are ___ fresh fruits in the basket.',
    options: ['some', 'any', 'much', 'few'],
    correctAnswer: 0,
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_g7',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Comparative Determiners',
    text: '___ students submitted their assignments on time this week.',
    options: ['Few', 'More', 'Less', 'Much'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_g8',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Prepositions of Place',
    text: 'The lecture is scheduled ___ the auditorium.',
    options: ['in', 'at', 'on', 'by'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_g9',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Prepositions',
    text: 'Children played ___ the park in the evening.',
    options: ['across', 'at', 'in', 'over'],
    correctAnswer: 2,
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_g10',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Articles',
    text: 'She is ___ honest person.',
    options: ['a', 'an', 'the', 'no article'],
    correctAnswer: 1,
    difficulty: 'A2',
    adaptiveWeight: 1.1
  },
  {
    id: 'aj_g11',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Modal Verbs',
    text: 'You ___ wear a helmet while riding a bike.',
    options: ['can', 'should', 'may', 'would'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_g12',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Subject-Verb Agreement',
    text: 'The team ___ playing well this season.',
    options: ['is', 'are', 'were', 'been'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.2
  },
  {
    id: 'aj_g13',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Conjunctions',
    text: 'She studied hard ___ she could pass the exam.',
    options: ['because', 'so that', 'although', 'unless'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_g14',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Pronouns',
    text: 'This is the book ___ I was telling you about.',
    options: ['who', 'which', 'whom', 'whose'],
    correctAnswer: 1,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  },
  {
    id: 'aj_g15',
    type: 'read_and_select',
    module: 'reading',
    title: 'Grammar - Passive Voice',
    text: 'The letter ___ by him yesterday.',
    options: ['was written', 'is written', 'wrote', 'has written'],
    correctAnswer: 0,
    difficulty: 'B1',
    adaptiveWeight: 1.3
  }
];

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

// Al Jamea Grade 6 English Test Configuration
export const alJameaGrade6Test: LinguaskillTest = {
  id: 'linguaskill_aljamea_grade6',
  title: 'Al Jamea Grade 6 English Test Set 1 - Complete',
  modules: ['reading', 'listening', 'writing', 'speaking'], // All 4 modules
  isAdaptive: false, // Grade-level test, not adaptive
  maxDuration: 180, // All sections: Listening 40 + Speaking 40 + Reading 60 + Writing 30 + Grammar 15
  questions: alJameaGrade6Questions,
  candidateInfo: {
    ...sampleCandidateInfo,
    additionalInfo: {
      purpose: 'Grade 6 Complete Assessment - All 106 Questions',
      targetScore: 'A2-B1',
      previousTestDate: '',
      specialRequirements: 'None',
      grade: 'Grade 6',
      school: 'Al Jamea',
      totalSections: '5 (A-E)',
      totalQuestions: '106',
      totalMarks: '185'
    }
  },
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
