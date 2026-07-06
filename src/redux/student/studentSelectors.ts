import {RootState} from '../store';

export const selectCourses = (state: RootState) => state.student.enrolledCourses;