import { ReactNode } from "react";

interface Props {
    title: string;
    value: number;
    icon: ReactNode;
    color: string;
}

const StatsCard = ({ title, value, icon, color }: Props) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center hover:shadow-lg transition">
            <div>
                <p className="text-gray-500">
                    {title}
                </p>
                <h2 className="text-4xl font-bold mt-3">{value}</h2>
            </div>
            <div className={`${color} text-white p-4 rounded-full`}>
                 {icon}
            </div>
        </div>
    );
}

export default StatsCard;