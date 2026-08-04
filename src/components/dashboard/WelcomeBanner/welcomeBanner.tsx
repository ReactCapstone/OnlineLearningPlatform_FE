import { useAppSelector } from "../../../redux/hooks";
import { selectAuthUser } from "../../../redux/auth/authSelectors";
import { selectWeeklyGoal } from "../../../redux/dashboard/dashboardSelectors";
import { FiTarget } from "react-icons/fi";

const WelcomeBanner = () => {
    const user = useAppSelector(selectAuthUser);
    const weeklyGoal = useAppSelector(selectWeeklyGoal);

    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold">Welcome Back, {user?.fullName ?? "Learner"}!</h2>
                <p className="mt-3 opacity-90">Continue your learning journey today.</p>
            </div>
            {weeklyGoal && (
                <div className="bg-white/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <FiTarget size={26} />
                        <div>
                            <p className="text-sm">Today's Goals</p>
                            <h3 className="text-2xl font-bold">{weeklyGoal.goalLessons} lessons</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WelcomeBanner;