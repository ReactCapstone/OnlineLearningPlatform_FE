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

    recommendedCourses:[

{

id:1,

title:"Next.js Bootcamp",

instructor:"Maximilian",

image:"https://picsum.photos/400/250?4",

rating:4.9,

duration:"14 Hours",

students:23500

},

{

id:2,

title:"Node.js API Masterclass",

instructor:"Andrew Mead",

image:"https://picsum.photos/400/250?5",

rating:4.8,

duration:"18 Hours",

students:17200

}

],

upcomingClasses:[

{

id:1,

title:"React Performance",

date:"Monday",

time:"7:00 PM",

instructor:"John Smith"

},

{

id:2,

title:"Redux Toolkit Live",

date:"Wednesday",

time:"8:30 PM",

instructor:"David Warner"

}

],

activities:[

{

id:1,

activity:"Completed React Hooks Module",

time:"Today"

},

{

id:2,

activity:"Quiz Submitted",

time:"Yesterday"

},

{

id:3,

activity:"Certificate Earned",

time:"2 Days Ago"

}

]
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        // Define your reducers here if needed
    },
});

export default studentSlice.reducer;