import apiClient from '../api/apiClient';
import type { WishlistCourse } from '../redux/student/wishlistSlice';

class WishlistService {
    async getWishlist(search?: string): Promise<WishlistCourse[]> {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        const response = await apiClient<{ data: WishlistCourse[] }>(`/Wishlist${query}`, {
            method: 'GET',
        });

        return response.data as WishlistCourse[];
    }

    async addToWishlist(courseId: number): Promise<void> {
        await apiClient(`/Wishlist/${courseId}`, {
            method: 'POST',
        });
    }

    async removeFromWishlist(courseId: number): Promise<void> {
        await apiClient(`/Wishlist/${courseId}`, {
            method: 'DELETE',
        });
    }
}

export default new WishlistService();
