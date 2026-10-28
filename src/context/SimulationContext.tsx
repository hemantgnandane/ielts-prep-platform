import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { AnswerValue, Question, ReadingPassage, SimulationResult } from '../types';
import { academicPassage, generalPassage, generatePaletteQuestions } from '../data/passages';
import { useTrack } from './TrackContext';

export type FontScale = 'standard' | 'large' | 'extralarge';

interface SimulationContextType {
  currentPassage: ReadingPassage;
  paletteQuestions: Question[];
  activeQuestionNumber: number;
  answers: Record<number, AnswerValue>;
  reviewFlags: Record<number, boolean>;
  timeRemainingSeconds: number;
  showTimer: boolean;
  isTimerRunning: boolean;
  isSubmitted: boolean;
  isResultModalOpen: boolean;
  fontScale: FontScale;
  simulationResult: SimulationResult | null;
  
  // Actions
  setActiveQuestionNumber: (num: number) => void;
  setAnswer: (questionNumber: number, answer: AnswerValue) => void;
  toggleReviewFlag: (questionNumber: number) => void;
  toggleShowTimer: () => void;
  setFontScale: (scale: FontScale) => void;
  submitExam: () => void;
  resetExam: () => void;
  closeResultModal: () => void;
  openResultModal: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  
  // Computed helpers
  answeredCount: number;
  reviewedCount: number;
  totalQuestions: number;
  activeQuestionData: Question | undefined;
}

const DEFAULT_SECTION_TIME_SECONDS = 20 * 60; // 20 minutes per standard reading passage

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { track } = useTrack();

  const currentPassage = useMemo(() => {
    return track === 'academic' ? academicPassage : generalPassage;
  }, [track]);

  const paletteQuestions = useMemo(() => {
    return generatePaletteQuestions(track);
  }, [track]);

  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [reviewFlags, setReviewFlags] = useState<Record<number, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(DEFAULT_SECTION_TIME_SECONDS);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);
  const [fontScale, setFontScale] = useState<FontScale>('standard');
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  // Reset or re-align when track switches
  useEffect(() => {
    setAnswers({});
    setReviewFlags({});
    setActiveQuestionNumber(1);
    setTimeRemainingSeconds(DEFAULT_SECTION_TIME_SECONDS);
    setIsSubmitted(false);
    setIsResultModalOpen(false);
    setSimulationResult(null);
    setIsTimerRunning(true);
  }, [track]);

  // Countdown timer effect
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isSubmitted]);

  // Handle auto-submit when timer reaches 0
  useEffect(() => {
    if (timeRemainingSeconds === 0 && !isSubmitted) {
      handleFinalSubmit();
    }
  }, [timeRemainingSeconds, isSubmitted]);

  const setAnswer = useCallback((questionNumber: number, answer: AnswerValue) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: answer
    }));
  }, []);

  const toggleReviewFlag = useCallback((questionNumber: number) => {
    setReviewFlags(prev => ({
      ...prev,
      [questionNumber]: !prev[questionNumber]
    }));
  }, []);

  const toggleShowTimer = useCallback(() => {
    setShowTimer(prev => !prev);
  }, []);

  const nextQuestion = useCallback(() => {
    setActiveQuestionNumber(prev => Math.min(prev + 1, paletteQuestions.length));
  }, [paletteQuestions.length]);

  const prevQuestion = useCallback(() => {
    setActiveQuestionNumber(prev => Math.max(prev - 1, 1));
  }, []);

  const calculateBandScore = (correctCount: number, total: number, testTrack: string): number => {
    // IELTS Reading Academic vs General Band Conversion curve
    if (total === 13) {
      // Scaled for Section 1 passage simulation (13 questions)
      const ratio = correctCount / 13;
      if (ratio >= 0.92) return 9.0;
      if (ratio >= 0.84) return 8.5;
      if (ratio >= 0.76) return 8.0;
      if (ratio >= 0.69) return 7.5;
      if (ratio >= 0.61) return 7.0;
      if (ratio >= 0.53) return 6.5;
      if (ratio >= 0.46) return 6.0;
      if (ratio >= 0.38) return 5.5;
      if (ratio >= 0.30) return 5.0;
      return 4.5;
    }

    // 40 questions full band scale
    if (testTrack === 'academic') {
      if (correctCount >= 39) return 9.0;
      if (correctCount >= 37) return 8.5;
      if (correctCount >= 35) return 8.0;
      if (correctCount >= 33) return 7.5;
      if (correctCount >= 30) return 7.0;
      if (correctCount >= 27) return 6.5;
      if (correctCount >= 23) return 6.0;
      if (correctCount >= 19) return 5.5;
      if (correctCount >= 15) return 5.0;
      return 4.0;
    } else {
      if (correctCount >= 40) return 9.0;
      if (correctCount >= 39) return 8.5;
      if (correctCount >= 37) return 8.0;
      if (correctCount >= 36) return 7.5;
      if (correctCount >= 34) return 7.0;
      if (correctCount >= 32) return 6.5;
      if (correctCount >= 30) return 6.0;
      if (correctCount >= 26) return 5.5;
      if (correctCount >= 23) return 5.0;
      return 4.0;
    }
  };

  const handleFinalSubmit = useCallback(() => {
    setIsSubmitted(true);
    setIsTimerRunning(false);

    // Assess Section 1 (current passage questions 1-13)
    const evaluatedBreakdown = currentPassage.questions.map(q => {
      const userAns = answers[q.number] || null;
      const isCorrect = userAns === q.correctAnswer;
      return {
        questionId: q.id,
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const score = evaluatedBreakdown.filter(item => item.isCorrect).length;
    const rawBandScore = calculateBandScore(score, currentPassage.questions.length, track);

    const result: SimulationResult = {
      score,
      totalQuestions: currentPassage.questions.length,
      rawBandScore,
      timeSpentSeconds: DEFAULT_SECTION_TIME_SECONDS - timeRemainingSeconds,
      breakdown: evaluatedBreakdown
    };

    setSimulationResult(result);
    setIsResultModalOpen(true);
  }, [answers, currentPassage.questions, timeRemainingSeconds, track]);

  const submitExam = useCallback(() => {
    handleFinalSubmit();
  }, [handleFinalSubmit]);

  const resetExam = useCallback(() => {
    setAnswers({});
    setReviewFlags({});
    setActiveQuestionNumber(1);
    setTimeRemainingSeconds(DEFAULT_SECTION_TIME_SECONDS);
    setIsSubmitted(false);
    setIsResultModalOpen(false);
    setSimulationResult(null);
    setIsTimerRunning(true);
  }, []);

  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(val => val !== null && val !== undefined).length;
  }, [answers]);

  const reviewedCount = useMemo(() => {
    return Object.values(reviewFlags).filter(Boolean).length;
  }, [reviewFlags]);

  const activeQuestionData = useMemo(() => {
    return paletteQuestions.find(q => q.number === activeQuestionNumber);
  }, [paletteQuestions, activeQuestionNumber]);

  return (
    <SimulationContext.Provider
      value={{
        currentPassage,
        paletteQuestions,
        activeQuestionNumber,
        answers,
        reviewFlags,
        timeRemainingSeconds,
        showTimer,
        isTimerRunning,
        isSubmitted,
        isResultModalOpen,
        fontScale,
        simulationResult,
        setActiveQuestionNumber,
        setAnswer,
        toggleReviewFlag,
        toggleShowTimer,
        setFontScale,
        submitExam,
        resetExam,
        closeResultModal: () => setIsResultModalOpen(false),
        openResultModal: () => setIsResultModalOpen(true),
        nextQuestion,
        prevQuestion,
        answeredCount,
        reviewedCount,
        totalQuestions: paletteQuestions.length,
        activeQuestionData
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = (): SimulationContextType => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

