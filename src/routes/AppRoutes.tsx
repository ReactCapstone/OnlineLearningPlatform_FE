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
import Progress from '../pages/Progress'
import Goals from '../pages/Goals'
 import Certificate from '../pages/Certificate'
//import CourseDetails from "../pages/CourseDetails"

//admin dashboard Routes
import AdminHome from '../pages/AdminDashboard/AdminHome'
import AdminLogin from '../pages/AdminDashboard/AdminLogin'
import CourseList from '../pages/AdminDashboard/courses/CourseList'
import AddCourse from '../pages/AdminDashboard/courses/AddCourse'
import AddCourseLesson from '../pages/AdminDashboard/courses/AddCourseLesson'
import AddLesson from '../pages/AdminDashboard/courses/AddLesson.tsx'
import AddAssessment from '../pages/AdminDashboard/assessments/AddAssessment'
import ViewAssessments from '../pages/AdminDashboard/assessments/ViewAssessments'
import Categories from '../pages/AdminDashboard/categories/Categories'

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
            <Route path="/quiz/:courseId" element={<Quiz />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/course/:courseId" element={<CoursePlayer />} /> 
           <Route path="/certificates" element={<Certificate />} />
            {/* <Route path="/course/:id" element={<CourseDetails />} />  */}

            {/* Admin dashboard routes */}
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/dashboard" element={<AdminHome />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/courses" element={<CourseList />} />
            <Route path="/admin/courses/list" element={<CourseList />} />
            <Route path="/admin/courses/add" element={<AddCourse />} />
            <Route path="/admin/course-lessons" element={<AddCourseLesson />} />
            <Route path="/admin/course-lessons/add" element={<AddCourseLesson />} />
            <Route path="/admin/course-lessons/:courseId/add" element={<AddLesson />} />
            <Route path="/admin/assessments/add" element={<AddAssessment />} />
            <Route path="/admin/assessments/view" element={<ViewAssessments />} />
            <Route path="/admin/assessments/view/:courseId" element={<ViewAssessments />} />
            <Route path="/admin/categories" element={<Categories />} />
        </Routes>
    )
}
