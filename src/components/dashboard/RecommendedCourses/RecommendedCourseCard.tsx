import type { RecommendedCourseItem } from "../../../types/dashboard";

interface Props {
    course: RecommendedCourseItem;
}

const RecommendedCourseCard = ({ course }: Props) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
                src={course.thumbnail}
                className="w-full h-40 object-cover"
            />
            <div className="p-5">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-gray-500 mt-2">{course.instructor}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                        {course.level}
                    </span>
                    <span className="font-semibold text-gray-900">${course.price.toFixed(2)}</span>
                </div>
                <button className="w-full mt-5 bg-indigo-600 text-white py-2 rounded-lg">
                    View Course
                </button>
            </div>
        </div>
    );
};

export default RecommendedCourseCard;