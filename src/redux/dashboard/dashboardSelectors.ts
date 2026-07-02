import { RootState } from "../store";

export const selectDashboard = (state: RootState) => state.dashboard;

export const selectStatistics = (state: RootState) => state.dashboard.statistics;
