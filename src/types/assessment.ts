// src/types/assessment.ts

export interface AssessmentOption {
    id: number;
    optionText: string;
    isCorrect?: boolean;
}

export interface AssessmentQuestion {
    id: number;
    questionText: string;
    orderIndex: number;
    options: AssessmentOption[];
}

export interface Assessment {
    id: number;
    courseId?: number;
    title: string;
    timeLimitMinutes: number;
    passPercentage: number;
    totalQuestions: number;
    maxAttempts: number;
    questions: AssessmentQuestion[];
}

export interface StartAttemptData {
    attemptId: number;
    startedAt: string;
    expiresAt: string;
    timeLimitMinutes: number;
}

export interface SubmitAnswer {
    questionId: number;
    selectedOptionId: number;
}

export interface SubmitRequest {
    attemptId: number;
    answers: SubmitAnswer[];
}

export interface SubmitResult {
    attemptId: number;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    passPercentage: number;
    isPassed: boolean;
    submittedAt: string;
}

// Replaces the old MyStatusData shape entirely
export interface MyStatusData {
    hasActiveAttempt: boolean;
    activeAttemptId: number | null;
    latestResult: SubmitResult | null;
    attemptCount: number;
    maxAttempts: number;          // 0 = unlimited
    attemptsRemaining: number | null; // null when unlimited
    canRetake: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
}

export interface Option {
  optionText: string;
  isCorrect: boolean;
}

export interface Question {
  questionText: string;
  orderIndex: number;
  options: Option[];
}

export interface QuizPayload {
  courseId: number;
  title: string;
  timeLimitMinutes: number;
  passPercentage: number;
  maxAttempts: number;
  questions: Question[];
}