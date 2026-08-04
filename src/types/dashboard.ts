export interface DashboardStats {
    enrolledCourses: number;
    inProgressCourses: number;
    completedCourses: number;
    certificatesEarned: number;
}

export interface ContinueLearningItem {
    courseId: number;
    title: string;
    instructor: string;
    thumbnail: string;
    totalLessons: number;
    completedLessons: number;
    progressPercent: number;
    currentLesson: string | null;
}

export interface RecommendedCourseItem {
    id: number;
    title: string;
    instructor: string;
    thumbnail: string;
    category: string;
    level: string;
    price: number;
    totalLessons: number;
}

export interface RecentActivityItem {
    activityType: string;
    title: string;
    activityDate: string;
    timeAgo: string;
}

export interface WeeklyGoal {
    goalLessons: number;
    completedThisWeek: number;
    progressPercent: number;
}

export interface UpcomingClassItem {
    id: number;
    title: string;
    instructor: string;
    dayOfWeek: string;
    time: string;
    scheduledAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
}