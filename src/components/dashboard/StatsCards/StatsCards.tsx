import { FiBookOpen, FiClock, FiCheckCircle, FiAward } from "react-icons/fi";
import { useAppSelector } from "../../../redux/hooks";
import { selectDashboardStats } from "../../../redux/dashboard/dashboardSelectors";
import StatCard from "./StatCard";

const StatsCards = () => {
  const stats = useAppSelector(selectDashboardStats);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard
        title="Enrolled Courses"
        value={stats.enrolledCourses}
        icon={<FiBookOpen size={26} />}
        color="bg-blue-500"
      />
      <StatCard
        title="In Progress"
        value={stats.inProgressCourses}
        icon={<FiClock size={26} />}
        color="bg-yellow-500"
      />
      <StatCard
        title="Completed"
        value={stats.completedCourses}
        icon={<FiCheckCircle size={26} />}
        color="bg-green-500"
      />
      <StatCard
        title="Certificates"
        value={stats.certificatesEarned}
        icon={<FiAward size={26} />}
        color="bg-purple-500"
      />
    </div>
  );
};

export default StatsCards;