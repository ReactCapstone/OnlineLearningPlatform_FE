import apiClient from "../api/apiClient";
import type { CourseDto, CreateCourseDto, ApiResponse } from "../types/course";

// Re-exported so callers can pull the DTOs from this service, matching sectionService/lessonService.
export type { CourseDto, CreateCourseDto, ApiResponse } from "../types/course";

class CourseService {
    async getCourses(): Promise<CourseDto[]> {
        const response = await apiClient<ApiResponse<CourseDto[]>>("/Courses", {
            method: "GET",
            skipAuth: true
        });
        return response.data;
    }

    async getCourse(id: number): Promise<CourseDto> {
        const response = await apiClient<ApiResponse<CourseDto>>(`/Courses/${id}`, {
            method: "GET",
            skipAuth: true
        });
        return response.data;
    }

    async createCourse(payload: CreateCourseDto): Promise<CourseDto> {
        const response = await apiClient<ApiResponse<CourseDto>>("/Courses", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        return response.data;
    }

    async deleteCourse(id: number): Promise<void> {
        await apiClient<ApiResponse<null>>(`/Courses/${id}`, {
            method: "DELETE",
        });
    }
}

export default new CourseService();