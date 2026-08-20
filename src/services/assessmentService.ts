// src/services/assessmentService.ts

import apiClient from '../api/apiClient';
import type {
    ApiResponse,
    Assessment,
    StartAttemptData,
    SubmitRequest,
    SubmitResult,
    MyStatusData,
    QuizPayload,
} from '../types/assessment';

class AssessmentService {
    async getAssessmentByCourse(courseId: number): Promise<Assessment> {
        const response = await apiClient<ApiResponse<Assessment>>(
            `/Assessment/course/${courseId}`,
            { method: 'GET' }
        );
        return response.data;
    }

    async getMyStatus(courseId: number): Promise<MyStatusData> {
        const response = await apiClient<ApiResponse<MyStatusData>>(
            `/Assessment/course/${courseId}/my-status`,
            { method: 'GET' }
        );
        return response.data;
    }

    async startAttempt(assessmentId: number): Promise<StartAttemptData> {
        const response = await apiClient<ApiResponse<StartAttemptData>>(
            `/Assessment/${assessmentId}/start`,
            { method: 'POST' }
        );
        return response.data;
    }

    async submitAttempt(payload: SubmitRequest): Promise<SubmitResult> {
        const response = await apiClient<ApiResponse<SubmitResult>>(
            `/Assessment/submit`,
            { method: 'POST', body: JSON.stringify(payload) }
        );
        return response.data;
    }

    async getAttemptResult(attemptId: number): Promise<SubmitResult> {
        const response = await apiClient<ApiResponse<SubmitResult>>(
            `/Assessment/attempts/${attemptId}`,
            { method: 'GET' }
        );
        return response.data;
    }

    async createAssesment(payload: QuizPayload): Promise<SubmitResult> {
        const response = await apiClient<ApiResponse<SubmitResult>>(
            `/Assessment`,
            { method: 'POST', body: JSON.stringify(payload) }
        );
        return response.data;

    }

}

export default new AssessmentService();