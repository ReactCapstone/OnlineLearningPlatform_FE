import { configureStore } from "@reduxjs/toolkit";

import studentReducer from "./student/studentSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import wishlistReducer from "./student/wishlistSlice";
import authReducer from './auth/authSlice';
import assessmentReducer from './assessment/assessmentSlice';

export const store = configureStore({
  reducer: {
    student: studentReducer,
    wishlist: wishlistReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
    assessment: assessmentReducer, // new
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch