import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Welcome Back, John!</h1>
      <p className="mt-3 text-gray-600">Continue your learning journey.</p>
    </DashboardLayout>
  );
};

export default DashboardHome