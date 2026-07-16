import { Routes, Route } from 'react-router-dom'

import DashboardHome from '../pages/StudentDashboard/DashboardHome'
import Home from '../pages/Home'
import Courses from '../pages/Courses'
import AllCourses from '../pages/AllCourses'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Quiz from '../pages/Quiz'
import Assessments from '../pages/Assessments'
import Wishlist from '../pages/Wishlist'
import CoursePlayer from '../pages/CoursePlayer'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/quiz/:topicId" element={<Quiz />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/course/:courseId" element={<CoursePlayer />} />
        </Routes>
    )
}
