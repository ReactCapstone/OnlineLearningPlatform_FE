
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Courses from '../pages/Courses'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Quiz from '../pages/Quiz'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}