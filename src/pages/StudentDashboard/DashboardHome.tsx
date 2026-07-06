import { Outlet } from 'react-router-dom'
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <Outlet />
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome