import apiClient from "../api/apiClient";

export interface CourseDto
{
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    categoryId: number;
    instructorId: number;
    price: number;
    level: string;
    language: string;
    isPublished: boolean;
}

interface ApiResponse<T>
{
    success: boolean;
    message: string;
    data: T;
}

class CourseService
{

    async getCourses(): Promise<CourseDto[]> {

        const response = await apiClient<ApiResponse<CourseDto[]>>("/Courses", {
            method: "GET",
            skipAuth: true
        });

return response.data;
    }

    async getCourse(id: number): Promise<CourseDto> {

        const response =
            await apiClient<ApiResponse<CourseDto>>(
                `/Courses/${id}`,
                {
                    method: "GET",
                    skipAuth: true
                });

        return response.data;

    }
}


export default new CourseService();