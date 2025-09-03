import { useState, useEffect, useCallback } from 'react';

export interface ProctoringViolation {
  id: string;
  type: 'tab_switch' | 'window_blur' | 'right_click' | 'key_combination';
  timestamp: Date;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ProctoringStatus {
  isActive: boolean;
  violations: ProctoringViolation[];
  warningCount: number;
  isExamTerminated: boolean;
  lastViolation?: ProctoringViolation;
}

export const useProctoringMonitor = (examId: string, isExamActive: boolean = true) => {
  const [proctoringStatus, setProctoringStatus] = useState<ProctoringStatus>({
    isActive: false,
    violations: [],
    warningCount: 0,
    isExamTerminated: false
  });

  const [showViolationModal, setShowViolationModal] = useState(false);
  const [currentViolation, setCurrentViolation] = useState<ProctoringViolation | null>(null);

  // Configuration
  const MAX_WARNINGS = 3;
  const VIOLATION_COOLDOWN = 2000; // 2 seconds between violations
  let lastViolationTime = 0;

  const createViolation = useCallback((
    type: ProctoringViolation['type'],
    description: string,
    severity: ProctoringViolation['severity'] = 'medium'
  ): ProctoringViolation => {
    return {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: new Date(),
      description,
      severity
    };
  }, []);

  const addViolation = useCallback((violation: ProctoringViolation) => {
    const now = Date.now();
    
    // Prevent spam violations
    if (now - lastViolationTime < VIOLATION_COOLDOWN) {
      return;
    }
    lastViolationTime = now;

    setProctoringStatus(prev => {
      const newWarningCount = prev.warningCount + 1;
      const shouldTerminate = newWarningCount >= MAX_WARNINGS;

      const newStatus = {
        ...prev,
        violations: [...prev.violations, violation],
        warningCount: newWarningCount,
        isExamTerminated: shouldTerminate,
        lastViolation: violation
      };

      // Show violation modal
      setCurrentViolation(violation);
      setShowViolationModal(true);

      // Log violation (in real app, send to server)
      console.warn(`Proctoring Violation [${violation.type}]:`, violation);

      return newStatus;
    });
  }, []);

  // Tab/Window visibility detection
  useEffect(() => {
    if (!isExamActive || !proctoringStatus.isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const violation = createViolation(
          'tab_switch',
          'Candidate switched to another tab or window',
          'high'
        );
        addViolation(violation);
      }
    };

    const handleWindowBlur = () => {
      const violation = createViolation(
        'window_blur',
        'Exam window lost focus',
        'medium'
      );
      addViolation(violation);
    };


    // Prevent right-click context menu
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      const violation = createViolation(
        'right_click',
        'Candidate attempted to open context menu',
        'low'
      );
      addViolation(violation);
    };

    // Prevent common key combinations
    const handleKeyDown = (e: KeyboardEvent) => {
      const forbiddenKeys = [
        { key: 'F12', description: 'Developer tools access attempt' },
        { key: 'F5', description: 'Page refresh attempt' },
        { ctrl: true, key: 'r', description: 'Page refresh attempt (Ctrl+R)' },
        { ctrl: true, key: 'R', description: 'Page refresh attempt (Ctrl+R)' },
        { ctrl: true, shift: true, key: 'I', description: 'Developer tools access attempt (Ctrl+Shift+I)' },
        { ctrl: true, shift: true, key: 'i', description: 'Developer tools access attempt (Ctrl+Shift+I)' },
        { ctrl: true, shift: true, key: 'J', description: 'Console access attempt (Ctrl+Shift+J)' },
        { ctrl: true, shift: true, key: 'j', description: 'Console access attempt (Ctrl+Shift+J)' },
        { ctrl: true, key: 'u', description: 'View source attempt (Ctrl+U)' },
        { ctrl: true, key: 'U', description: 'View source attempt (Ctrl+U)' },
        { alt: true, key: 'Tab', description: 'Alt+Tab window switching attempt' },
        { key: 'Alt', description: 'Alt key usage detected' }
      ];

      for (const forbidden of forbiddenKeys) {
        const isMatch = forbidden.key === e.key &&
          (forbidden.ctrl === undefined || forbidden.ctrl === e.ctrlKey) &&
          (forbidden.shift === undefined || forbidden.shift === e.shiftKey) &&
          (forbidden.alt === undefined || forbidden.alt === e.altKey);

        if (isMatch) {
          e.preventDefault();
          const violation = createViolation(
            'key_combination',
            forbidden.description,
            'medium'
          );
          addViolation(violation);
          break;
        }
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExamActive, proctoringStatus.isActive, addViolation, createViolation]);

  const startProctoring = useCallback(() => {
    setProctoringStatus(prev => ({ ...prev, isActive: true }));
  }, []);

  const stopProctoring = useCallback(() => {
    setProctoringStatus(prev => ({ ...prev, isActive: false }));
  }, []);

  const dismissViolation = useCallback(() => {
    setShowViolationModal(false);
    setCurrentViolation(null);
  }, []);

  const getViolationsByType = useCallback((type: ProctoringViolation['type']) => {
    return proctoringStatus.violations.filter(v => v.type === type);
  }, [proctoringStatus.violations]);

  const getRemainingWarnings = useCallback(() => {
    return Math.max(0, MAX_WARNINGS - proctoringStatus.warningCount);
  }, [proctoringStatus.warningCount]);

  return {
    proctoringStatus,
    showViolationModal,
    currentViolation,
    startProctoring,
    stopProctoring,
    dismissViolation,
    getViolationsByType,
    getRemainingWarnings,
    maxWarnings: MAX_WARNINGS
  };
};
