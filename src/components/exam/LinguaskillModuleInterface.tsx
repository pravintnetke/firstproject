import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Play, 
  Pause, 
  Volume2,
  Mic,
  Square,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Headphones,
  PenTool,
  MessageSquare
} from 'lucide-react';
import { LinguaskillModule, TestSession, LinguaskillQuestion, AdaptiveTestingState } from '@/types/linguaskill';
import { sampleLinguaskillQuestions, moduleDurations } from '@/data/linguaskillData';

interface LinguaskillModuleInterfaceProps {
  module: LinguaskillModule;
  testSession: TestSession;
  onComplete: () => void;
  onBack: () => void;
}

export default function LinguaskillModuleInterface({ 
  module, 
  testSession, 
  onComplete, 
  onBack 
}: LinguaskillModuleInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(() => {
    // Set module-specific time limits
    const durations = {
      reading: 59 * 60,    // 59 minutes
      listening: 59 * 60,  // 59 minutes  
      writing: 45 * 60,    // 45 minutes
      speaking: 16 * 60    // 16 minutes
    };
    return durations[module] || 60 * 60;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [preparationTime, setPreparationTime] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [hasPlayedBeep, setHasPlayedBeep] = useState(false);
  const [adaptiveState, setAdaptiveState] = useState<AdaptiveTestingState>({
    currentLevel: 3, // Start at B1 level
    confidence: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    isComplete: false,
    estimatedCEFRLevel: 'B1'
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // Load voices for speech synthesis
  useEffect(() => {
    // Load voices when component mounts
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      // Some browsers need this event to load voices
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Get questions for current module
  const questions = sampleLinguaskillQuestions.filter(q => q.module === module);
  const currentQuestion = questions[currentQuestionIndex];


  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitModule();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Preparation timer for speaking/listening questions
  useEffect(() => {
    if (currentQuestion?.preparationTime && preparationTime === 0) {
      setPreparationTime(currentQuestion.preparationTime);
      setHasPlayedBeep(false);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (preparationTime > 0) {
      const timer = setTimeout(() => {
        setPreparationTime(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (preparationTime === 0 && currentQuestion?.preparationTime && !hasPlayedBeep && module === 'speaking') {
      // Play beep when preparation time ends for speaking questions
      playBeepSound();
      setHasPlayedBeep(true);
    }
  }, [preparationTime, hasPlayedBeep, currentQuestion, module]);

  // Response time countdown for speaking questions
  useEffect(() => {
    if (responseTime > 0 && isRecording) {
      const timer = setTimeout(() => {
        setResponseTime(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (responseTime === 0 && isRecording) {
      // Auto-stop recording when time runs out
      handleRecording();
    }
  }, [responseTime, isRecording]);

  const playBeepSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // High beep
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      
      oscillator.start();
      
      // Short beep for 0.5 seconds
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 500);
    } catch (error) {
      console.error('Could not play beep sound:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    // Update word count for writing questions
    if (typeof value === 'string' && currentQuestion.type === 'essay_writing') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }
  };

  const handleAudioPlay = () => {
    if (playCount < 2) {
      if (isPlaying) {
        // Stop any playing audio or speech
        if (audioRef.current) {
          audioRef.current.pause();
        }
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        // Check if audio file exists
        if (currentQuestion.audioUrl && !currentQuestion.audioUrl.includes('/audio/')) {
          // Play actual audio file
          if (audioRef.current) {
            audioRef.current.play().then(() => {
              setIsPlaying(true);
              if (audioRef.current!.currentTime === 0) {
                setPlayCount(prev => prev + 1);
              }
            }).catch(() => {
              console.error('Audio playback failed');
              setIsPlaying(false);
            });
          }
        } else {
          // Use Text-to-Speech for transcript
          const textToSpeak = extractTranscriptText(currentQuestion.text);
          
          if (textToSpeak) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            
            // Configure speech settings
            utterance.rate = 0.9; // Slightly slower for clarity
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            utterance.lang = 'en-IN'; // Indian English
            
            // Try to use Indian English voice
            const voices = window.speechSynthesis.getVoices();
            
            // Priority order: Indian English voices
            const preferredVoice = 
              // First try: Google Indian English voices
              voices.find(voice => voice.lang === 'en-IN' && voice.name.includes('Google')) ||
              // Second try: Microsoft Indian English voices
              voices.find(voice => voice.lang === 'en-IN' && voice.name.includes('Microsoft')) ||
              // Third try: Any Indian English voice
              voices.find(voice => voice.lang === 'en-IN') ||
              // Fourth try: Any English voice with 'India' in name
              voices.find(voice => voice.lang.startsWith('en') && voice.name.toLowerCase().includes('india')) ||
              // Fallback: Any English voice
              voices.find(voice => voice.lang.startsWith('en'));
            
            if (preferredVoice) {
              utterance.voice = preferredVoice;
              console.log('Using voice:', preferredVoice.name, preferredVoice.lang);
            }
            
            utterance.onstart = () => {
              setIsPlaying(true);
              setPlayCount(prev => prev + 1);
            };
            
            utterance.onend = () => {
              setIsPlaying(false);
            };
            
            utterance.onerror = () => {
              setIsPlaying(false);
              console.error('Speech synthesis failed');
            };
            
            window.speechSynthesis.speak(utterance);
          }
        }
      }
    }
  };

  // Extract transcript text from question text
  const extractTranscriptText = (text: string): string => {
    // Remove instruction text and extract only the transcript/content to be spoken
    // Look for patterns like "Listen to the description:" or "Transcript:"
    
    // Remove common instruction phrases
    let cleanText = text
      .replace(/^Listen to the description[:\s]*/i, '')
      .replace(/^Listen and [^:]*[:\s]*/i, '')
      .replace(/^Listen[:\s]*/i, '')
      .replace(/^Transcript[:\s]*/i, '')
      .replace(/^Audio[:\s]*/i, '')
      .replace(/\n\nChoose the correct.*$/s, '')
      .replace(/\n\nAnswer:.*$/s, '')
      .trim();
    
    return cleanText || text;
  };

  const handleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        const chunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(blob);
          handleAnswerChange({ audioBlob: blob, audioUrl: url });
          stream.getTracks().forEach(track => track.stop());
          setResponseTime(0);
        };
        
        mediaRecorder.start();
        setIsRecording(true);
        
        // Set response time countdown
        if (currentQuestion.responseTime) {
          setResponseTime(currentQuestion.responseTime);
        }
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Microphone access denied. Please allow microphone access to record your response.');
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  const handleNextQuestion = () => {
    // Update adaptive state for Reading/Listening
    if ((module === 'reading' || module === 'listening') && currentQuestion.correctAnswer !== undefined) {
      const userAnswer = answers[currentQuestion.id];
      const correctAnswer = currentQuestion.correctAnswer;
      
      // Check if answer is correct (handle both single answers and arrays)
      const isCorrect = Array.isArray(correctAnswer) 
        ? JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)
        : userAnswer === correctAnswer;
      
      const newQuestionsAnswered = adaptiveState.questionsAnswered + 1;
      const newCorrectAnswers = adaptiveState.correctAnswers + (isCorrect ? 1 : 0);
      const accuracy = newCorrectAnswers / newQuestionsAnswered;
      
      // Adaptive level adjustment based on performance
      let newLevel = adaptiveState.currentLevel;
      const currentDifficulty = getDifficultyLevel(currentQuestion.difficulty);
      
      if (isCorrect && accuracy >= 0.7 && newLevel < 6) {
        // Move up if doing well
        newLevel = Math.min(6, newLevel + 0.5);
      } else if (!isCorrect && accuracy < 0.5 && newLevel > 1) {
        // Move down if struggling
        newLevel = Math.max(1, newLevel - 0.5);
      }
      
      // Calculate confidence based on consistency and number of questions
      const confidence = Math.min(1, (newQuestionsAnswered / 10) * accuracy);
      
      // Determine CEFR level
      const cefrLevel = getCEFRFromLevel(Math.round(newLevel));
      
      // Check if adaptive test should end
      const shouldEnd = (
        newQuestionsAnswered >= 15 || // Maximum questions
        (newQuestionsAnswered >= 8 && confidence >= 0.8) || // High confidence
        (newQuestionsAnswered >= 12 && confidence >= 0.6) // Moderate confidence with more data
      );
      
      setAdaptiveState(prev => ({
        ...prev,
        currentLevel: newLevel,
        questionsAnswered: newQuestionsAnswered,
        correctAnswers: newCorrectAnswers,
        confidence,
        isComplete: shouldEnd,
        estimatedCEFRLevel: cefrLevel
      }));
      
      // End adaptive test if criteria met
      if (shouldEnd) {
        handleSubmitModule();
        return;
      }
    }

    // Reset question-specific state
    setPlayCount(0);
    setPreparationTime(0);
    setIsPlaying(false);
    
    // Stop any ongoing speech synthesis
    window.speechSynthesis.cancel();

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitModule();
    }
  };
  
  const getDifficultyLevel = (difficulty: string): number => {
    const levels = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6 };
    return levels[difficulty as keyof typeof levels] || 3;
  };
  
  const getCEFRFromLevel = (level: number): string => {
    const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    return cefrLevels[Math.max(0, Math.min(5, level - 1))];
  };

  const calculateConfidence = (total: number, correct: number): number => {
    if (total === 0) return 0;
    return correct / total;
  };

  const handleSubmitModule = () => {
    // Save module results
    console.log(`${module} module completed`, { answers, adaptiveState });
    onComplete();
  };

  const getModuleIcon = () => {
    switch (module) {
      case 'reading': return BookOpen;
      case 'listening': return Headphones;
      case 'writing': return PenTool;
      case 'speaking': return MessageSquare;
      default: return BookOpen;
    }
  };

  // Reusable Audio Player Component
  const AudioPlayer = ({ disabled = false }: { disabled?: boolean }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
        <Button 
          onClick={handleAudioPlay}
          disabled={playCount >= 2 || disabled}
          variant={isPlaying ? "destructive" : "default"}
          size="lg"
        >
          {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isPlaying ? 'Stop Audio' : 'Play Audio'}
        </Button>
        <div className="flex flex-col text-sm text-gray-600">
          <span className="font-medium">Plays remaining: {2 - playCount}</span>
          {playCount > 0 && <span className="text-green-600">✓ Played {playCount} time(s)</span>}
          {playCount >= 2 && <span className="text-red-600">⚠ Maximum plays reached</span>}
        </div>
        {currentQuestion.audioUrl && !currentQuestion.audioUrl.includes('/audio/') && (
          <audio
            ref={audioRef}
            src={currentQuestion.audioUrl}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
          />
        )}
      </div>
      
      {/* Audio instructions */}
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700">
          🎧 <strong>Text-to-Speech:</strong> The transcript will be read aloud in Indian English using your browser's speech synthesis. 
          {currentQuestion.audioUrl && !currentQuestion.audioUrl.includes('/audio/') 
            ? ' Audio file will be played.' 
            : ' For production, replace with actual audio recordings.'}
        </p>
      </div>
    </div>
  );

  const renderQuestionContent = () => {
    if (!currentQuestion) {
      return (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Questions Available</h3>
          <p className="text-gray-600 mb-4">
            No questions found for the {module} module. This might be a configuration issue.
          </p>
          <p className="text-sm text-gray-500">
            Available questions: {questions.length} | Current index: {currentQuestionIndex}
          </p>
          <Button onClick={onBack} className="mt-4">
            Back to Module Selection
          </Button>
        </div>
      );
    }

    switch (currentQuestion.type) {
      case 'read_and_select':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg leading-relaxed">{currentQuestion.text}</p>
            </div>
            <RadioGroup
              value={answers[currentQuestion.id]?.toString() || ''}
              onValueChange={(value) => handleAnswerChange(parseInt(value))}
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'open_gap_fill':
        const renderTextWithGaps = (text: string) => {
          const parts = text.split(/(\[\d+\])/g);
          return parts.map((part, index) => {
            const gapMatch = part.match(/\[(\d+)\]/);
            if (gapMatch) {
              const gapNumber = parseInt(gapMatch[1]) - 1; // Convert to 0-based index
              return (
                <span key={index} className="inline-block mx-1">
                  <Input
                    className="inline-block w-20 h-8 text-center border-b-2 border-l-0 border-r-0 border-t-0 border-blue-500 rounded-none bg-transparent focus:bg-blue-50 focus:outline-none"
                    placeholder={`${gapNumber + 1}`}
                    value={answers[currentQuestion.id]?.[gapNumber] || ''}
                    onChange={(e) => {
                      const newAnswers = [...(answers[currentQuestion.id] || Array(currentQuestion.gaps).fill(''))];
                      newAnswers[gapNumber] = e.target.value;
                      handleAnswerChange(newAnswers);
                    }}
                    onFocus={(e) => e.target.select()}
                  />
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          });
        };

        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-800 font-medium">
                Click on each gap then type the word which you think fits best. Type only one word in each gap.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              {currentQuestion.title && (
                <h3 className="text-xl font-semibold mb-4 text-center">{currentQuestion.title}</h3>
              )}
              <div className="text-lg leading-relaxed">
                {renderTextWithGaps(currentQuestion.text)}
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress:</span>
                <span className="text-sm text-gray-600">
                  {(answers[currentQuestion.id] || []).filter(answer => answer && answer.trim()).length} / {currentQuestion.gaps || 0} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((answers[currentQuestion.id] || []).filter(answer => answer && answer.trim()).length / (currentQuestion.gaps || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        );

      case 'gap_fill_select':
        const renderTextWithSelectGaps = (text: string) => {
          const parts = text.split(/(\[\d+\])/g);
          return parts.map((part, index) => {
            const gapMatch = part.match(/\[(\d+)\]/);
            if (gapMatch) {
              const gapNumber = parseInt(gapMatch[1]) - 1; // Convert to 0-based index
              const gapOptions = currentQuestion.gapOptions?.[gapNumber] || [];
              return (
                <span key={index} className="inline-block mx-1">
                  <select
                    className="inline-block min-w-20 h-8 text-center border-b-2 border-l-0 border-r-0 border-t-0 border-blue-500 rounded-none bg-transparent focus:bg-blue-50 focus:outline-none cursor-pointer"
                    value={answers[currentQuestion.id]?.[gapNumber] || ''}
                    onChange={(e) => {
                      const newAnswers = [...(answers[currentQuestion.id] || Array(currentQuestion.gaps).fill(''))];
                      newAnswers[gapNumber] = e.target.value;
                      handleAnswerChange(newAnswers);
                    }}
                  >
                    <option value="" className="text-gray-400">{gapNumber + 1}</option>
                    {gapOptions.map((option, optionIndex) => (
                      <option key={optionIndex} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          });
        };

        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <p className="text-sm text-green-800 font-medium">
                📝 Gap Fill (Select): Click on each gap and choose the best word from the dropdown menu.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              {currentQuestion.title && (
                <h3 className="text-xl font-semibold mb-4 text-center">{currentQuestion.title}</h3>
              )}
              <div className="text-lg leading-relaxed">
                {renderTextWithSelectGaps(currentQuestion.text)}
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress:</span>
                <span className="text-sm text-gray-600">
                  {(answers[currentQuestion.id] || []).filter(answer => answer && answer.trim()).length} / {currentQuestion.gaps || 0} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((answers[currentQuestion.id] || []).filter(answer => answer && answer.trim()).length / (currentQuestion.gaps || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Answer options reference */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3">Available Options:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentQuestion.gapOptions?.map((options, gapIndex) => (
                  <div key={gapIndex} className="bg-white p-3 rounded border">
                    <div className="font-medium text-gray-700 mb-2">Gap {gapIndex + 1}:</div>
                    <div className="flex flex-wrap gap-1">
                      {options.map((option, optionIndex) => (
                        <span 
                          key={optionIndex} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'extended_reading':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-800 font-medium">
                📖 Extended Reading: Read the passage carefully and choose the best answer.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              {currentQuestion.title && (
                <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">{currentQuestion.title}</h3>
              )}
              <div className="text-base leading-relaxed text-gray-700 whitespace-pre-line">
                {currentQuestion.text}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-gray-800 mb-4">
                Which of the following best summarizes the main idea of the passage?
              </h4>
              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ''}
                onValueChange={(value) => handleAnswerChange(parseInt(value))}
              >
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm leading-relaxed">
                      <span className="font-medium text-gray-600 mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Reading tips */}
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-800">
                💡 <strong>Reading Tip:</strong> Read the passage completely first, then read each option carefully. 
                Look for the option that best captures the overall message, not just specific details.
              </p>
            </div>
          </div>
        );

      case 'listening_mcq_sentences':
        return (
          <div className="space-y-6">
            {preparationTime > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium">Preparation Time: {preparationTime}s</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Read the question and options before listening.</p>
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg leading-relaxed mb-4">{currentQuestion.text}</p>
              <AudioPlayer disabled={preparationTime > 0} />
            </div>

            {preparationTime === 0 && (
              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ''}
                onValueChange={(value) => handleAnswerChange(parseInt(value))}
              >
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        );

      case 'essay_writing':
        const essayText = answers[currentQuestion.id]?.toString() || '';
        const essayWordCount = essayText.trim().split(/\s+/).filter(word => word.length > 0).length;
        const minWords = currentQuestion.wordCountMin || 150;
        const maxWords = currentQuestion.wordCountMax || 300;
        const isWordCountValid = essayWordCount >= minWords && essayWordCount <= maxWords;
        
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg leading-relaxed">{currentQuestion.text}</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm text-blue-800">
                  <strong>Requirements:</strong> Write {minWords}-{maxWords} words. 
                  Structure your essay with clear introduction, body paragraphs, and conclusion.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="essay" className="text-base font-medium">Your Essay</Label>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={
                      essayWordCount < minWords ? "destructive" : 
                      essayWordCount > maxWords ? "destructive" : 
                      "default"
                    }
                    className="text-sm"
                  >
                    Words: {essayWordCount} / {minWords}-{maxWords}
                  </Badge>
                  {isWordCountValid && (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      ✓ Word count OK
                    </Badge>
                  )}
                </div>
              </div>
              
              <Textarea
                id="essay"
                placeholder="Type your essay here... Remember to organize your ideas clearly with an introduction, body paragraphs, and conclusion."
                value={essayText}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className={`min-h-[500px] text-base leading-relaxed transition-colors ${
                  essayText ? 'bg-blue-50' : 'bg-white'
                } focus:ring-2 focus:ring-blue-500`}
                style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '16px',
                  lineHeight: '1.6'
                }}
              />
              
              <div className="flex justify-between items-start text-xs text-gray-600">
                <div className="space-y-1">
                  <p>• No spell-check available</p>
                  <p>• You can cut, copy, and paste your own text</p>
                  <p>• Text area turns blue when you start typing</p>
                </div>
                <div className="text-right space-y-1">
                  <p>Time remaining: {formatTime(timeLeft)}</p>
                  <p className={essayWordCount < minWords ? 'text-red-600' : 'text-green-600'}>
                    {essayWordCount < minWords ? 
                      `Need ${minWords - essayWordCount} more words` : 
                      'Minimum word count reached'
                    }
                  </p>
                </div>
              </div>
              
              {/* Writing tips */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Writing Tips:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Plan your essay structure before writing</li>
                  <li>• Use clear topic sentences for each paragraph</li>
                  <li>• Support your arguments with examples</li>
                  <li>• Check your grammar and punctuation</li>
                  <li>• Leave time to review your work</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'justify_opinion':
      case 'summarize_and_discuss':
      case 'make_recommendation':
      case 'discuss_statement':
        const getTaskInstructions = (type: string) => {
          switch (type) {
            case 'justify_opinion':
              return 'Give your opinion and explain your reasons with examples.';
            case 'summarize_and_discuss':
              return 'First listen to the audio, then summarize the key points and discuss them.';
            case 'make_recommendation':
              return 'Review the information and make a clear recommendation with reasons.';
            case 'discuss_statement':
              return 'Discuss both sides of the statement and give your personal opinion.';
            default:
              return 'Speak clearly and use the full time allocated for your response.';
          }
        };

        return (
          <div className="space-y-6">
            {/* Task-specific instructions */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-medium text-blue-800 mb-2">Task Instructions:</h4>
              <p className="text-sm text-blue-700">{getTaskInstructions(currentQuestion.type)}</p>
            </div>

            {/* Preparation Time */}
            {preparationTime > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Preparation Time: {preparationTime}s</span>
                </div>
                <p className="text-sm text-yellow-700 mt-2">
                  📝 Use this time to organize your thoughts. A beep will signal when to start speaking.
                </p>
              </div>
            )}

            {/* Question Content */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg leading-relaxed mb-4">{currentQuestion.text}</p>
              {currentQuestion.audioUrl && (
                <div className="mt-4">
                  <AudioPlayer disabled={preparationTime > 0} />
                </div>
              )}
            </div>

            {/* Recording Section */}
            {preparationTime === 0 && (
              <div className="space-y-4">
                {/* Recording Controls */}
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={handleRecording}
                        variant={isRecording ? "destructive" : "default"}
                        size="lg"
                        disabled={!currentQuestion.responseTime}
                      >
                        {isRecording ? (
                          <>
                            <Square className="h-5 w-5 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="h-5 w-5 mr-2" />
                            Start Recording
                          </>
                        )}
                      </Button>
                      
                      {isRecording && responseTime > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="animate-pulse h-3 w-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium text-red-600">
                            Recording... {formatTime(responseTime)} remaining
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {currentQuestion.responseTime && !isRecording && (
                      <div className="text-sm text-gray-600">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Response time: {formatTime(currentQuestion.responseTime)}
                      </div>
                    )}
                  </div>
                  
                  {/* Recording Tips */}
                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                    💡 <strong>Tips:</strong> Speak clearly, use natural pace, organize your ideas logically, 
                    and try to use the full time allocated for your response.
                  </div>
                </div>
                
                {/* Completed Recording Playback */}
                {answers[currentQuestion.id]?.audioUrl && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Recording Complete</span>
                    </div>
                    <audio controls className="w-full">
                      <source src={answers[currentQuestion.id].audioUrl} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-xs text-green-700 mt-2">
                      You can record again if needed by clicking "Start Recording" above.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'missing_sentence_completion':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg leading-relaxed whitespace-pre-line">{currentQuestion.text}</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600 font-medium">
                Drag and drop the sentences to fill the gaps in the correct order:
              </p>
              
              {/* Drag and Drop Options */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Available Sentences:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {currentQuestion.dragDropOptions?.map((option, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', index.toString());
                        e.dataTransfer.setData('sentence', option);
                      }}
                      className="p-3 bg-white border border-blue-200 rounded-lg cursor-move hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <span className="text-sm font-medium text-blue-600 mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Drop Zones */}
              <div className="space-y-3">
                <h4 className="font-medium">Drop sentences here:</h4>
                {[0, 1, 2].map((gapIndex) => (
                  <div
                    key={gapIndex}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const draggedIndex = e.dataTransfer.getData('text/plain');
                      const sentence = e.dataTransfer.getData('sentence');
                      
                      const currentAnswers = Array.isArray(answers[currentQuestion.id]) 
                        ? [...(answers[currentQuestion.id] as string[])]
                        : ['', '', ''];
                      currentAnswers[gapIndex] = draggedIndex;
                      handleAnswerChange(currentAnswers);
                    }}
                    className="min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center"
                  >
                    <span className="text-sm font-medium text-gray-500 mr-3">Gap {gapIndex + 1}:</span>
                    {Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id][gapIndex] ? (
                      <div className="flex-1 p-2 bg-white border border-green-200 rounded text-sm">
                        <span className="font-medium text-green-600 mr-2">
                          {String.fromCharCode(65 + parseInt(answers[currentQuestion.id][gapIndex]))}. 
                        </span>
                        {currentQuestion.dragDropOptions?.[parseInt(answers[currentQuestion.id][gapIndex])]}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Drop a sentence here</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );


      case 'sentence_completion_typing':
        return (
          <div className="space-y-6">
            {preparationTime > 0 && (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Preparation Time: {preparationTime}s</span>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg leading-relaxed mb-4 whitespace-pre-line">{currentQuestion.text}</p>
              <AudioPlayer disabled={preparationTime > 0} />
            </div>

            {preparationTime === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Complete the sentences by typing the missing words:</p>
                <div className="grid grid-cols-1 gap-4">
                  {Array.from({ length: currentQuestion.gaps || 3 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`sentence-${index}`}>Sentence {index + 1}</Label>
                      <Input
                        id={`sentence-${index}`}
                        placeholder="Type the missing word(s)"
                        value={
                          Array.isArray(answers[currentQuestion.id]) 
                            ? (answers[currentQuestion.id] as string[])[index] || ''
                            : ''
                        }
                        onChange={(e) => {
                          const currentAnswers = Array.isArray(answers[currentQuestion.id]) 
                            ? [...(answers[currentQuestion.id] as string[])]
                            : new Array(currentQuestion.gaps || 3).fill('');
                          currentAnswers[index] = e.target.value;
                          handleAnswerChange(currentAnswers);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'table_completion_matching':
        return (
          <div className="space-y-6">
            {preparationTime > 0 && (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Preparation Time: {preparationTime}s</span>
                </div>
                <p className="text-sm text-orange-700 mt-2">Read the table and options before listening.</p>
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg leading-relaxed mb-4">{currentQuestion.text}</p>
              <AudioPlayer disabled={preparationTime > 0} />
            </div>

            {preparationTime === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 font-medium">
                  Match each speaker to their hobby by selecting from the dropdown:
                </p>
                
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Speaker</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Hobby</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {['Speaker 1', 'Speaker 2', 'Speaker 3', 'Speaker 4', 'Speaker 5'].map((speaker, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{speaker}</td>
                          <td className="px-4 py-3">
                            <select
                              value={
                                Array.isArray(answers[currentQuestion.id]) 
                                  ? (answers[currentQuestion.id] as string[])[index] || ''
                                  : ''
                              }
                              onChange={(e) => {
                                const currentAnswers = Array.isArray(answers[currentQuestion.id]) 
                                  ? [...(answers[currentQuestion.id] as string[])]
                                  : new Array(5).fill('');
                                currentAnswers[index] = e.target.value;
                                handleAnswerChange(currentAnswers);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select a hobby...</option>
                              {currentQuestion.options?.map((option, optionIndex) => (
                                <option key={optionIndex} value={optionIndex.toString()}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="text-xs text-gray-500">
                  <p>💡 Tip: Listen carefully to each speaker and match them to the correct hobby from the list.</p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Question Type Not Supported</h3>
            <p className="text-gray-600">
              Question type "{currentQuestion.type}" is not yet implemented.
            </p>
          </div>
        );
    }
  };

  if (showInstructions) {
    const ModuleIcon = getModuleIcon();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <ModuleIcon className="h-16 w-16 mx-auto mb-4 text-blue-600" />
              <CardTitle className="text-2xl capitalize">{module} Module</CardTitle>
              <p className="text-gray-600">Duration: {moduleDurations[module]} minutes</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Instructions:</h3>
                <ul className="text-sm space-y-1">
                  {module === 'reading' && (
                    <>
                      <li>• This is an adaptive test - difficulty adjusts based on your performance</li>
                      <li>• You cannot go back to previous questions</li>
                      <li>• The test ends when your level is determined</li>
                    </>
                  )}
                  {module === 'listening' && (
                    <>
                      <li>• Each audio recording can be played twice</li>
                      <li>• You have preparation time before each question</li>
                      <li>• Listen carefully as you cannot replay after the limit</li>
                    </>
                  )}
                  {module === 'writing' && (
                    <>
                      <li>• You have 45 minutes for one writing task</li>
                      <li>• There is no spell-check available</li>
                      <li>• You can cut, copy, and paste your own text</li>
                      <li>• A word counter is displayed</li>
                    </>
                  )}
                  {module === 'speaking' && (
                    <>
                      <li>• You will record your responses using the microphone</li>
                      <li>• Each question has preparation and response time</li>
                      <li>• Speak clearly and try to use the full time allocated</li>
                      <li>• A beep will signal when to start speaking</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>
                  Back to Module Selection
                </Button>
                <Button onClick={() => setShowInstructions(false)} size="lg">
                  Start {module} Test
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold capitalize">{module} Module</h1>
            <Badge variant="outline">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className={`h-4 w-4 ${timeLeft < 300 ? 'text-destructive' : 'text-warning'}`} />
              <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-destructive' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <Button onClick={handleSubmitModule} variant="destructive">
              Submit Module
            </Button>
          </div>
        </div>
        
        <div className="mt-3">
          <Progress 
            value={(currentQuestionIndex + 1) / questions.length * 100} 
            className="h-2"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Question {currentQuestionIndex + 1}
                  <Badge variant="outline">{currentQuestion?.difficulty}</Badge>
                </CardTitle>
                {(module === 'reading' || module === 'listening') && (
                  <Badge variant="secondary">
                    Adaptive Level: {adaptiveState.estimatedCEFRLevel}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              {renderQuestionContent()}
              
              <div className="flex justify-between mt-8 pt-4 border-t">
                <div className="flex gap-2">
                  {/* Only Writing module allows backward navigation */}
                  {module === 'writing' && (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                        disabled={currentQuestionIndex === 0}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button variant="outline" onClick={handleSubmitModule}>
                        End Test Early
                      </Button>
                    </>
                  )}
                  
                  {/* Show navigation warning for other modules */}
                  {module !== 'writing' && currentQuestionIndex > 0 && (
                    <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      No backward navigation allowed
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {/* Skip question option for difficult questions */}
                  {(module === 'reading' || module === 'listening') && (
                    <Button 
                      variant="outline"
                      onClick={handleNextQuestion}
                      className="text-orange-600 border-orange-300 hover:bg-orange-50"
                    >
                      Skip Question
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleNextQuestion}
                    disabled={
                      (module === 'speaking' && !answers[currentQuestion?.id]?.audioUrl) ||
                      (preparationTime > 0)
                    }
                    size="lg"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish Module' : 'Next Question'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
