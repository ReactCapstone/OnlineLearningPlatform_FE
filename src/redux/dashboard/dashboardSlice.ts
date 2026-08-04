// src/redux/dashboard/dashboardSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashboardService from '../../services/dashboardService';
import type { DashboardState } from './dashboardTypes';

const initialState: DashboardState = {
    stats: null,
    continueLearning: [],
    recommended: [],
    recentActivity: [],
    weeklyGoal: null,
    upcomingClasses: [],
    loading: false,
    error: null,
};

// One thunk that fires all six requests together — the dashboard is one
// cohesive screen, so a single loading state for all sections keeps this simple.
export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const [stats, continueLearning, recommended, recentActivity, weeklyGoal, upcomingClasses] =
                await Promise.all([
                    dashboardService.getStats(),
                    dashboardService.getContinueLearning(),
                    dashboardService.getRecommended(),
                    dashboardService.getRecentActivity(),
                    dashboardService.getWeeklyGoal(),
                    dashboardService.getUpcomingClasses(),
                ]);
            return { stats, continueLearning, recommended, recentActivity, weeklyGoal, upcomingClasses };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload.stats;
                state.continueLearning = action.payload.continueLearning;
                state.recommended = action.payload.recommended;
                state.recentActivity = action.payload.recentActivity;
                state.weeklyGoal = action.payload.weeklyGoal;
                state.upcomingClasses = action.payload.upcomingClasses;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default dashboardSlice.reducer;