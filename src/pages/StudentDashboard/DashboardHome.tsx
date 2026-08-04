import { useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner/welcomeBanner";
import StatCards from "../../components/dashboard/StatsCards/StatsCards";
import ContinueLearning from "../../components/dashboard/ContinueLearning/ContinueLearning";
import RecommendedCourses from "../../components/dashboard/RecommendedCourses/RecommendedCourses";
import UpcomingClasses from "../../components/dashboard/UpcomingClasses/UpcomingClasses";
import RecentActivity from "../../components/dashboard/RecentActivity/RecentActivity";
import LearningGoals from "../../components/dashboard/LearningGoals/LearningGoals";
import { useAppDispatch } from "../../redux/hooks";
import { fetchDashboardData } from "../../redux/dashboard/dashboardSlice";

const DashboardHome = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeBanner />
        <StatCards />
        <ContinueLearning />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <RecommendedCourses />
          </div>
          <UpcomingClasses />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <RecentActivity />
          <LearningGoals />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;