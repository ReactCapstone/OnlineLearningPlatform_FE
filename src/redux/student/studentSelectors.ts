import {RootState} from '../store';

export const selectCourses = (state: RootState) => state.student.enrolledCourses;
export const selectRecommendedCourses=

(state:RootState)=>

state.student.recommendedCourses;

export const selectUpcomingClasses=

(state:RootState)=>

state.student.upcomingClasses;

export const selectActivities=

(state:RootState)=>

state.student.activities;