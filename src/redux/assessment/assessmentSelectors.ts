// src/redux/assessment/assessmentSelectors.ts

import type { RootState } from '../store';

export const selectAssessment = (state: RootState) => state.assessment.assessment;
export const selectAttempt = (state: RootState) => state.assessment.attempt;
export const selectAssessmentResult = (state: RootState) => state.assessment.result;
export const selectMyStatus = (state: RootState) => state.assessment.myStatus;
export const selectAssessmentLoading = (state: RootState) => state.assessment.loading;
export const selectAssessmentStatusLoading = (state: RootState) => state.assessment.statusLoading;
export const selectAssessmentSubmitting = (state: RootState) => state.assessment.submitting;
export const selectAssessmentError = (state: RootState) => state.assessment.error;