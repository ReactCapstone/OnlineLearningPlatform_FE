import { Link } from 'react-router-dom'
import ProgressBar from '../../common/ProgressBar/ProgressBar'
import { Course } from '../../../redux/student/studentTypes'
import { FiPlayCircle } from 'react-icons/fi'

interface Props {
  course: Course
}

const ContinueCourseCard = ({ course }: Props) => {
  return (
    <div className="bg-white shadow-sm overflow-hidden rounded-xl">
      <img src={course.image} className="w-full h-44 rounded-lg object-cover mr-4" />
      <div className="p-5">
        <h3 className="text-xl font-bold">{course.title}</h3>
        <p className="text-gray-500 mt-1">By {course.instructor}</p>
        <div className="mt-4">
          <ProgressBar value={course.progress} />
        </div>
        <div className="flex justify-between mt-3 text-sm text-gray-500">
          <span>{course.progress}% Completed</span>
          <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
        </div>
        <div className="mt-4">
          <p className="text-sm">Current Lesson</p>
          <p className="font-semibold mt-1">{course.currentLesson}</p>
        </div>
      </div>

      <Link
        to={`/course/${course.id}`}
        className="mt-5 flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors duration-200"
      >
        <FiPlayCircle size={24} />
        Resume Learning
      </Link>
    </div>
  )
}

export default ContinueCourseCard