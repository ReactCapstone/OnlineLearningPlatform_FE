import {configureStore} from "@reduxjs/toolkit";

import studentReducer from "./student/studentSlice";
import dashboardReducer from "./dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    dashboard: dashboardReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch