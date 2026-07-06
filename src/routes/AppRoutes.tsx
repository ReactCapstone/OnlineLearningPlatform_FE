
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Courses from '../pages/Courses'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Quiz from '../pages/Quiz'
import DashboardHome from '../pages/StudentDashboard/DashboardHome'
import WelcomeBanner from '../components/dashboard/WelcomeBanner/welcomeBanner'
import StatCards from '../components/dashboard/StatsCards/StatsCards'
import ContinueLearning from '../components/dashboard/ContinueLearning/ContinueLearning'

function DashboardOverview() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />
      <StatCards />
      <ContinueLearning />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<DashboardHome />}>
        <Route index element={<DashboardOverview />} />
        <Route path="assessments" element={<Quiz />} />
      </Route>
    </Routes>
  )
}