import apiClient from "../api/apiClient";

export interface LessonDto {

    id: number;

    sectionId: number;

    title: string;

    videoUrl: string;

    durationSeconds: number;

    orderIndex: number;

    isPreview: boolean;
}

interface ApiResponse<T> {

    success: boolean;

    message: string;

    data: T;
}

class LessonService {

    async getLessons(sectionId: number): Promise<LessonDto[]> {

        const response = await apiClient<ApiResponse<LessonDto[]>>(
            `/Lessons/section/${sectionId}`,
            {
                method: "GET",
                skipAuth: true
            });

        return response.data;
    }
}

export default new LessonService();