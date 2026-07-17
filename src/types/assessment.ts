// src/types/assessment.ts

export interface AssessmentOption {
    id: number;
    optionText: string;
}

export interface AssessmentQuestion {
    id: number;
    questionText: string;
    orderIndex: number;
    options: AssessmentOption[];
}

export interface Assessment {
    id: number;
    title: string;
    timeLimitMinutes: number;
    passPercentage: number;
    totalQuestions: number;
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

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
}

export interface MyStatusData {
    hasAttempted: boolean;
    attemptId: number | null;
    result: SubmitResult | null;
}