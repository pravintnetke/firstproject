import { useState, useCallback } from 'react';
import { AdaptiveTestingState, LinguaskillQuestion } from '@/types/linguaskill';

interface UseAdaptiveTestingProps {
  questions: LinguaskillQuestion[];
  initialLevel?: number; // 1-6 representing A1-C2
}

export function useAdaptiveTesting({ questions, initialLevel = 3 }: UseAdaptiveTestingProps) {
  const [state, setState] = useState<AdaptiveTestingState>({
    currentLevel: initialLevel,
    confidence: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    isComplete: false,
    estimatedCEFRLevel: getCEFRLevel(initialLevel)
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [adaptiveQuestions, setAdaptiveQuestions] = useState<LinguaskillQuestion[]>([]);

  // CEFR level mapping
  function getCEFRLevel(level: number): string {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    return levels[Math.max(0, Math.min(5, level - 1))];
  }

  // Calculate difficulty score for CEFR levels
  function getDifficultyScore(cefr: string): number {
    const scores = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6 };
    return scores[cefr as keyof typeof scores] || 3;
  }

  // Select next question based on current performance
  const selectNextQuestion = useCallback((currentLevel: number, questionsPool: LinguaskillQuestion[]): LinguaskillQuestion | null => {
    const targetCEFR = getCEFRLevel(currentLevel);
    
    // Filter questions around current level (±1 level)
    const suitableQuestions = questionsPool.filter(q => {
      const qLevel = getDifficultyScore(q.difficulty);
      return Math.abs(qLevel - currentLevel) <= 1;
    });

    if (suitableQuestions.length === 0) {
      return questionsPool[0] || null;
    }

    // Prefer questions at exact level, then slightly above, then below
    const exactLevel = suitableQuestions.filter(q => getDifficultyScore(q.difficulty) === currentLevel);
    const aboveLevel = suitableQuestions.filter(q => getDifficultyScore(q.difficulty) === currentLevel + 1);
    const belowLevel = suitableQuestions.filter(q => getDifficultyScore(q.difficulty) === currentLevel - 1);

    if (exactLevel.length > 0) {
      return exactLevel[Math.floor(Math.random() * exactLevel.length)];
    } else if (aboveLevel.length > 0) {
      return aboveLevel[Math.floor(Math.random() * aboveLevel.length)];
    } else {
      return belowLevel[Math.floor(Math.random() * belowLevel.length)];
    }
  }, []);

  // Initialize adaptive question sequence
  const initializeAdaptiveTest = useCallback(() => {
    const firstQuestion = selectNextQuestion(state.currentLevel, questions);
    if (firstQuestion) {
      setAdaptiveQuestions([firstQuestion]);
      setCurrentQuestionIndex(0);
    }
  }, [questions, selectNextQuestion, state.currentLevel]);

  // Process answer and update adaptive state
  const processAnswer = useCallback((questionId: string, userAnswer: any, correctAnswer: any) => {
    const isCorrect = Array.isArray(correctAnswer) 
      ? JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)
      : userAnswer === correctAnswer;

    setState(prevState => {
      const newQuestionsAnswered = prevState.questionsAnswered + 1;
      const newCorrectAnswers = prevState.correctAnswers + (isCorrect ? 1 : 0);
      const accuracy = newCorrectAnswers / newQuestionsAnswered;
      
      // Adjust level based on performance
      let newLevel = prevState.currentLevel;
      
      // Simple adaptive algorithm
      if (newQuestionsAnswered >= 3) {
        if (accuracy >= 0.8 && newLevel < 6) {
          newLevel = Math.min(6, prevState.currentLevel + 1);
        } else if (accuracy <= 0.4 && newLevel > 1) {
          newLevel = Math.max(1, prevState.currentLevel - 1);
        }
      }

      // Calculate confidence based on consistency
      const confidence = Math.min(1, newQuestionsAnswered / 10) * accuracy;
      
      // Determine if test should end
      const shouldEnd = (
        newQuestionsAnswered >= 15 || // Maximum questions
        (newQuestionsAnswered >= 8 && confidence >= 0.7) || // High confidence
        (newQuestionsAnswered >= 12 && confidence >= 0.5) // Moderate confidence with more questions
      );

      return {
        currentLevel: newLevel,
        confidence,
        questionsAnswered: newQuestionsAnswered,
        correctAnswers: newCorrectAnswers,
        isComplete: shouldEnd,
        estimatedCEFRLevel: getCEFRLevel(newLevel)
      };
    });

    // Add next question if test is not complete
    setState(currentState => {
      if (!currentState.isComplete) {
        const nextQuestion = selectNextQuestion(currentState.currentLevel, questions);
        if (nextQuestion) {
          setAdaptiveQuestions(prev => [...prev, nextQuestion]);
        }
      }
      return currentState;
    });
  }, [questions, selectNextQuestion]);

  // Get current question
  const getCurrentQuestion = useCallback((): LinguaskillQuestion | null => {
    return adaptiveQuestions[currentQuestionIndex] || null;
  }, [adaptiveQuestions, currentQuestionIndex]);

  // Move to next question
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < adaptiveQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      return true;
    }
    return false;
  }, [currentQuestionIndex, adaptiveQuestions.length]);

  // Get test progress
  const getProgress = useCallback(() => {
    const estimatedTotal = Math.min(15, Math.max(8, 10 - state.confidence * 5));
    return {
      current: state.questionsAnswered,
      estimated: Math.round(estimatedTotal),
      percentage: Math.min(100, (state.questionsAnswered / estimatedTotal) * 100)
    };
  }, [state.questionsAnswered, state.confidence]);

  // Reset test
  const resetTest = useCallback(() => {
    setState({
      currentLevel: initialLevel,
      confidence: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      isComplete: false,
      estimatedCEFRLevel: getCEFRLevel(initialLevel)
    });
    setAdaptiveQuestions([]);
    setCurrentQuestionIndex(0);
  }, [initialLevel]);

  return {
    state,
    currentQuestionIndex,
    adaptiveQuestions,
    initializeAdaptiveTest,
    processAnswer,
    getCurrentQuestion,
    nextQuestion,
    getProgress,
    resetTest,
    isComplete: state.isComplete
  };
}
