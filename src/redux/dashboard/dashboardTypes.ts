// src/redux/dashboard/dashboardTypes.ts

import type {
    DashboardStats,
    ContinueLearningItem,
    RecommendedCourseItem,
    RecentActivityItem,
    WeeklyGoal,
    UpcomingClassItem,
} from '../../types/dashboard';

export interface DashboardState {
    stats: DashboardStats | null;
    continueLearning: ContinueLearningItem[];
    recommended: RecommendedCourseItem[];
    recentActivity: RecentActivityItem[];
    weeklyGoal: WeeklyGoal | null;
    upcomingClasses: UpcomingClassItem[];
    loading: boolean;
    error: string | null;
}