import apiClient from '../api/apiClient';

export interface UserCourseProgressDto {
    enrollmentId: number;
    courseId: number;
    courseTitle: string;
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    currentLessonId: number;
    currentLessonTitle: string;
}

export interface MyProgressDto {
    overallCompletionPercentage: number;
    courses: UserCourseProgressDto[];
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
}

class ProgressService {
    async getMyProgress(): Promise<MyProgressDto> {
        const response = await apiClient<ApiResponse<MyProgressDto>>('/Progress/my-progress', {
            method: 'GET',
        });
        return response.data;
    }

    async getUserCourseProgress(userId: number = 1): Promise<UserCourseProgressDto[]> {
        const response = await apiClient<ApiResponse<UserCourseProgressDto[]>>(`/Progress/user/${userId}/courses`, {
            method: 'GET',
        });

        return response.data ?? [];
    }
}

export default new ProgressService();
