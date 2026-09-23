import apiClient from "../api/apiClient";

export const CATEGORY_OVERRIDES_STORAGE_KEY = "admin-category-name-overrides";

export interface CategoryDto {
    id: number;
    name: string;
    parentCategoryId: number | null;
    subCategories: CategoryDto[];
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

class CategoryService {
    async getCategories(): Promise<CategoryDto[]> {
        const response = await apiClient<ApiResponse<CategoryDto[]>>("/Category", {
            method: "GET",
            skipAuth: true,
        });
        return response.data;
    }

    async createCategory(name: string): Promise<CategoryDto> {
        const response = await apiClient<ApiResponse<CategoryDto | string>>("/Category", {
            method: "POST",
            body: JSON.stringify({ name }),
        });
        return typeof response.data === "string"
            ? { id: Date.now(), name, parentCategoryId: null, subCategories: [] }
            : response.data;
    }

    async updateCategory(categoryId: number, name: string): Promise<CategoryDto> {
        const response = await apiClient<ApiResponse<CategoryDto | string>>(`/Category/${categoryId}`, {
            method: "PUT",
            body: JSON.stringify({ name }),
        });
        return typeof response.data === "string"
            ? { id: categoryId, name, parentCategoryId: null, subCategories: [] }
            : response.data;
    }
}

export default new CategoryService();
