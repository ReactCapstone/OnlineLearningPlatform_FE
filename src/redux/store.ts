import {configureStore} from "@reduxjs/toolkit";

import studentReducer from "./student/studentSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import wishlistReducer from "./student/wishlistSlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    wishlist: wishlistReducer,
    dashboard: dashboardReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch