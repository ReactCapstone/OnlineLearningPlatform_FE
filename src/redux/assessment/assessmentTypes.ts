// src/redux/assessment/assessmentTypes.ts

import type { Assessment, StartAttemptData, SubmitResult, MyStatusData } from '../../types/assessment';

export interface AssessmentState {
    assessment: Assessment | null;
    attempt: StartAttemptData | null;
    result: SubmitResult | null;
    myStatus: MyStatusData | null;
    loading: boolean;
    statusLoading: boolean;
    submitting: boolean;
    error: string | null;
}