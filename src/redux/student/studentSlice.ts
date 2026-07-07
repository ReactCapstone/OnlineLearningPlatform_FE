import { createSlice } from '@reduxjs/toolkit';
import { StudentState } from './studentTypes';

const initialState: StudentState = {
    name: 'Komal',
    completedCourses: 5,
    wishlist: 4,
    notifications: 3,
    enrolledCourses: [
        {
            id: 1,
            title: 'React for Beginners',
            image: 'https://example.com/react-course.jpg',  
            progress: 50,
            instructor: 'John Doe',
            duration: '3h 30m',
            totalLessons: 10,
            completedLessons: 5,
            currentLesson: 'Introduction to React'
        },
        {
            id: 2,
            title: 'Advanced JavaScript',
            image: 'https://example.com/js-course.jpg',
            progress: 45,
            instructor: 'Jane Smith',
            duration: '4h 15m',
            totalLessons: 12,
            completedLessons: 0,
            currentLesson: 'JavaScript ES6 Features'
        },

        {
            id: 3,
            title: 'Python for Data Science',
            image: 'https://example.com/python-course.jpg',
            progress: 30,
            instructor: 'Alice Johnson',
            duration: '5h 20m',
            totalLessons: 15,
            completedLessons: 0,
            currentLesson: 'Data Analysis with Pandas'
        }
    ],
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        // Define your reducers here if needed
    },
});

export default studentSlice.reducer;