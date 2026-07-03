import {createSlice} from "@reduxjs/toolkit";
import {DashboardState} from "./dashboardTypes";

const initialState: DashboardState = {
    studentName: 'Komal Gupta',
    dailyGoal: '2 Hours',
    statistics: {
        enrolledCourses: 5,
        inProgressCourses: 3,
        completedCourses: 2,
        certificatesEarned: 1,
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