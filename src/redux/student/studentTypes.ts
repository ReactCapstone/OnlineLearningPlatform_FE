export interface Course{
    id: number;
    title: string;
    image: string;
    progress: number;
    instructor: string;
    duration: string;
    totalLessons?: number;
    completedLessons?: number;
    currentLesson?: string;
}

export interface StudentState{
    name: string;
    enrolledCourses: Course[];
    completedCourses: number;
    wishlist: number;
    notifications: number;
    recommendedCourses:RecommendedCourse[];
    upcomingClasses:UpcomingClass[];
    activities:Activity[];
    
}

export interface RecommendedCourse {

    id:number;

    title:string;

    instructor:string;

    image:string;

    rating:number;

    duration:string;

    students:number;

}

export interface UpcomingClass{

    id:number;

    title:string;

    date:string;

    time:string;

    instructor:string;

}

export interface Activity{

    id:number;

    activity:string;

    time:string;

}