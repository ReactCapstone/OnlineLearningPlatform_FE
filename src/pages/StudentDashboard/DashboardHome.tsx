import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner/welcomeBanner";
import StatCards from "../../components/dashboard/StatsCards/StatsCards";
import ContinueLearning from "../../components/dashboard/ContinueLearning/ContinueLearning";

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
     <WelcomeBanner />
     <StatCards />
     <ContinueLearning />
     </div>
    </DashboardLayout>
  );
};

export default DashboardHome