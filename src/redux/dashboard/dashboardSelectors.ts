// src/redux/dashboard/dashboardSelectors.ts

import type { RootState } from '../store';

export const selectDashboardStats = (state: RootState) => state.dashboard.stats;
export const selectContinueLearning = (state: RootState) => state.dashboard.continueLearning;
export const selectRecommended = (state: RootState) => state.dashboard.recommended;
export const selectRecentActivity = (state: RootState) => state.dashboard.recentActivity;
export const selectWeeklyGoal = (state: RootState) => state.dashboard.weeklyGoal;
export const selectUpcomingClasses = (state: RootState) => state.dashboard.upcomingClasses;
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;