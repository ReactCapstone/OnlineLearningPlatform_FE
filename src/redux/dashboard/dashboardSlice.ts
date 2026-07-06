import {createSlice} from "@reduxjs/toolkit";
import {DashboardState} from "./dashboardTypes";

const initialState: DashboardState = {
    studentName: 'Komal Gupta',
    dailyGoal: '2 Hours',
    statistics: {
        enrolledCourses: 12,
        inProgressCourses: 7,
        completedCourses: 5,
        certificatesEarned: 4,
    },
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        // Define your reducers here if needed
    },
});

export default dashboardSlice.reducer;