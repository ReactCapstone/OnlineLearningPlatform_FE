export interface Course{
    id: number;
    title: string;
    image: string;
    progress: number;
    instructor: string;
    duration: string;
}

export interface StudentState{
    name: string;
    enrolledCourses: Course[];
    completedCourses: number;
    wishlist: number;
    notifications: number;
    
}