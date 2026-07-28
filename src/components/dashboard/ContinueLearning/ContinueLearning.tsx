import ContinueCourseCard from './ContinueCourseCard'
import { useAppSelector } from '../../../redux/hooks'
import { selectCourses } from '../../../redux/student/studentSelectors'
import { Link } from 'react-router-dom'

const ContinueLearning = () => {
  const courses = useAppSelector(selectCourses)

  return (
    <>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Continue Learning</h2>
        <Link
          to="/progress"
          className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <ContinueCourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  )
}

export default ContinueLearning