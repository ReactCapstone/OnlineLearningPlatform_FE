import { useAppSelector } from "../../../redux/hooks";
import {selectDashboard} from "../../../redux/dashboard/dashboardSelectors";
import {FiTarget} from "react-icons/fi";

const WelcomeBanner = () => {
  const dashboard = useAppSelector(selectDashboard);
  
    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl shadow-md flex items-center justify-between"> 
            <div>
                <h2 className="text-3xl font-bold">Welcome Back,
                    {dashboard.studentName}!
                </h2>
                <p className="mt-3 opacity-90">Continue your learning journey today.</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
                <FiTarget size={26} />
                <div>
                    <p className="text-sm">Today's Goals</p>
                    <h3 className="text-2xl font-bold">{dashboard.dailyGoal}</h3>
                </div>
            </div>
              
            </div>
        </div>
    )
}

export default WelcomeBanner;