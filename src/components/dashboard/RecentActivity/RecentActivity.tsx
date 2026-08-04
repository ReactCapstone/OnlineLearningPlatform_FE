import { useAppSelector } from "../../../redux/hooks";
import { selectRecentActivity } from "../../../redux/dashboard/dashboardSelectors";

const RecentActivity = () => {
    const activities = useAppSelector(selectRecentActivity);

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <div className="mt-5 space-y-5">
                {activities.length === 0 ? (
                    <p className="text-sm text-gray-500">No recent activity yet.</p>
                ) : (
                    activities.map((activity, index) => (
                        <div key={`${activity.activityType}-${activity.activityDate}-${index}`}>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-gray-500 text-sm">{activity.timeAgo}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentActivity;