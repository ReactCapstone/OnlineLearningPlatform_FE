import apiClient from "../api/apiClient";

export interface SectionDto {
    id: number;
    courseId: number;
    title: string;
    orderIndex: number;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

class SectionService {

    async getSections(courseId: number): Promise<SectionDto[]> {

        const response = await apiClient<ApiResponse<SectionDto[]>>(
            `/Sections/course/${courseId}`,
            {
                method: "GET",
                skipAuth: true
            });

        return response.data;
    }
}

export default new SectionService();