export interface DashboardState{
    studentName: string;
    dailyGoal: string;
    statistics: DashboardStatistics;
}

export interface DashboardStatistics{
    enrolledCourses: number;
    inProgressCourses: number;
    completedCourses: number;
    certificatesEarned: number;
}