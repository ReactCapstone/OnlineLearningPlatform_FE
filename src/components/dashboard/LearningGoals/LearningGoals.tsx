import { useAppSelector } from "../../../redux/hooks";
import { selectWeeklyGoal } from "../../../redux/dashboard/dashboardSelectors";

const LearningGoals = () => {
    const goal = useAppSelector(selectWeeklyGoal);

    if (!goal) return null;

    return (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white p-6">
            <h2 className="text-xl font-bold">Weekly Goal</h2>
            <p className="mt-4">Complete {goal.goalLessons} Lessons</p>
            <div className="mt-5 h-3 bg-white/30 rounded-full">
                <div
                    className="bg-white h-3 rounded-full"
                    style={{ width: `${goal.progressPercent}%` }}
                />
            </div>
            <p className="mt-4">{goal.progressPercent}% Completed</p>
        </div>
    );
};

export default LearningGoals;