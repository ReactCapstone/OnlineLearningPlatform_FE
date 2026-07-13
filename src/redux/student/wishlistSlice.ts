import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistCourse {
  id: number;
  icon: string;
  iconBg: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
}

interface WishlistState {
  items: WishlistCourse[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistCourse>) {
      if (!state.items.some((course) => course.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter((course) => course.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
