import apiClient from '../api/apiClient';
import type { WishlistCourse } from '../redux/student/wishlistSlice'; // adjust path to match your actual file

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
}

class WishlistService {
    async getWishlist(search?: string): Promise<WishlistCourse[]> {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        const response = await apiClient<ApiResponse<WishlistCourse[]>>(`/Wishlist${query}`, {
            method: 'GET',
        });
        return response.data;
    }

    async addToWishlist(courseId: number): Promise<WishlistCourse> {
        const response = await apiClient<ApiResponse<WishlistCourse>>(`/Wishlist/${courseId}`, {
            method: 'POST',
        });
        return response.data;
    }

    async removeFromWishlist(courseId: number): Promise<boolean> {
        const response = await apiClient<ApiResponse<boolean>>(`/Wishlist/${courseId}`, {
            method: 'DELETE',
        });
        return response.data;
    }
}

export default new WishlistService();