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
        },
        {
            id: 2,
            title: 'Advanced JavaScript',
            image: 'https://example.com/js-course.jpg',
            progress: 0,
            instructor: 'Jane Smith',
            duration: '4h 15m',
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