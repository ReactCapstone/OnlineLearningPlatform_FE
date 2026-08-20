export interface CourseDto {
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
    numberOfLessons: number;
}

export interface CreateCourseDto {
    title: string;
    description: string;
    thumbnail: string;
    categoryId: number;
    instructorId: number;
    price: number;
    level: string;
    language: string;
    isPublished: boolean;
    numberOfLessons: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
}