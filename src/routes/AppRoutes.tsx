
import {Routes, Route} from 'react-router-dom'

import DashboardHome from '../pages/StudentDashboard/DashboardHome'
import Home from '../pages/Home'
import Courses from '../pages/Courses'
import AllCourses from '../pages/AllCourses'
import Login from '../pages/Login'
import Profile from '../pages/Profile'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DashboardHome />} />
<<<<<<< HEAD
            <Route path="/home" element={<Home />} />
=======
            <Route path="/home" element={<Home />} /> 
>>>>>>> ec323c7ed7421bdd0b2f2cbd249c52304b8fd68e
            <Route path="/courses" element={<Courses />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    )
}
