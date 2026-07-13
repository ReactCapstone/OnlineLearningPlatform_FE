import { RootState } from '../store';
import { WishlistCourse } from './wishlistSlice';

export const selectWishlistItems = (state: RootState) => state.wishlist.items as WishlistCourse[];
export const selectWishlistCount = (state: RootState) => state.wishlist.items.length;
