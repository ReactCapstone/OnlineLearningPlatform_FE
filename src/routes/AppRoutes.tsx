import { Routes, Route } from 'react-router-dom'

import DashboardHome from '../pages/StudentDashboard/DashboardHome'
import Home from '../pages/Home'
import Courses from '../pages/Courses'
import AllCourses from '../pages/AllCourses'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Quiz from '../pages/Quiz'

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
      <Route path="/assessments" element={<Quiz />} />
    </Routes>
  )
}