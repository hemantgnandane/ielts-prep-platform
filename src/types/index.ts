export type Theme = 'light' | 'dark';

export type TestTrack = 'academic' | 'general';

export type AnswerValue = 'TRUE' | 'FALSE' | 'NOT GIVEN' | null;

export interface Question {
  id: number;
  number: number;
  passageId: string;
  statement: string;
  correctAnswer: 'TRUE' | 'FALSE' | 'NOT GIVEN';
  explanation: string;
  paragraphReference?: string;
}

export interface UserResponse {
  questionId: number;
  answer: AnswerValue;
  flaggedForReview: boolean;
}

export interface ReadingParagraph {
  id: string;
  letter?: string;
  title?: string;
  content: string[];
}

export interface ReadingPassage {
  id: string;
  track: TestTrack;
  title: string;
  subtitle: string;
  timeAllocationMinutes: number;
  wordCount: number;
  sourceAttribution: string;
  paragraphs: ReadingParagraph[];
  questions: Question[];
}

export interface DisciplineModule {
  id: 'listening' | 'reading' | 'writing' | 'speaking';
  title: string;
  duration: string;
  questionCount: string;
  badge: string;
  academicSpecifics: {
    overview: string;
    taskBreakdown: { name: string; desc: string; time?: string }[];
    evaluationCriteria: string[];
    sampleFocus: string;
  };
  generalSpecifics: {
    overview: string;
    taskBreakdown: { name: string; desc: string; time?: string }[];
    evaluationCriteria: string[];
    sampleFocus: string;
  };
}

export interface TrackComparisonRow {
  dimension: string;
  academic: string;
  general: string;
  relevanceTag: string;
}

export interface SimulationResult {
  score: number;
  totalQuestions: number;
  rawBandScore: number;
  timeSpentSeconds: number;
  breakdown: {
    questionId: number;
    userAnswer: AnswerValue;
    correctAnswer: 'TRUE' | 'FALSE' | 'NOT GIVEN';
    isCorrect: boolean;
    explanation: string;
  }[];
}

