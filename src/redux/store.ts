import { configureStore } from "@reduxjs/toolkit";

import studentReducer from "./student/studentSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import wishlistReducer from "./student/wishlistSlice";
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    student: studentReducer,
    wishlist: wishlistReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch