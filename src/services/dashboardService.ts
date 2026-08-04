import apiClient from '../api/apiClient';
import type {
    ApiResponse,
    DashboardStats,
    ContinueLearningItem,
    RecommendedCourseItem,
    RecentActivityItem,
    WeeklyGoal,
    UpcomingClassItem,
} from '../types/dashboard';

class DashboardService {
    async getStats(): Promise<DashboardStats> {
        const response = await apiClient<ApiResponse<DashboardStats>>('/Dashboard/stats', {
            method: 'GET',
        });
        return response.data;
    }

    async getContinueLearning(): Promise<ContinueLearningItem[]> {
        const response = await apiClient<ApiResponse<ContinueLearningItem[]>>('/Dashboard/continue-learning', {
            method: 'GET',
        });
        return response.data;
    }

    async getRecommended(): Promise<RecommendedCourseItem[]> {
        const response = await apiClient<ApiResponse<RecommendedCourseItem[]>>('/Dashboard/recommended', {
            method: 'GET',
        });
        return response.data;
    }

    async getRecentActivity(): Promise<RecentActivityItem[]> {
        const response = await apiClient<ApiResponse<RecentActivityItem[]>>('/Dashboard/recent-activity', {
            method: 'GET',
        });
        return response.data;
    }

    async getWeeklyGoal(): Promise<WeeklyGoal> {
        const response = await apiClient<ApiResponse<WeeklyGoal>>('/Dashboard/weekly-goal', {
            method: 'GET',
        });
        return response.data;
    }

    async getUpcomingClasses(): Promise<UpcomingClassItem[]> {
        const response = await apiClient<ApiResponse<UpcomingClassItem[]>>('/Dashboard/upcoming-classes', {
            method: 'GET',
        });
        return response.data;
    }
}

export default new DashboardService();