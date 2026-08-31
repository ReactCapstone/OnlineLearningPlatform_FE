import { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import courseService from '../../../services/courseService'
import type { CourseDto } from '../../../types/course'
import { Link } from 'react-router-dom'
// Section and lesson APIs will be added back when section selection is enabled.
// import sectionService, { type SectionDto } from '../../../services/sectionService'
// import lessonService, { type LessonDto } from '../../../services/lessonService'

export default function AddCourseLesson() {
  const [courses, setCourses] = useState<CourseDto[]>([])
  const [courseId, setCourseId] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<CourseDto | null>(null)
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setCourses(await courseService.getCourses())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses.')
      } finally {
        setLoadingCourses(false)
      }
    }

    void loadCourses()
  }, [])

  const handleCourseChange = (value: string) => {
    setCourseId(value)
    setSelectedCourse(null)
    setError('')
  }

  const handleContinue = () => {
    const course = courses.find(item => item.id === Number(courseId)) ?? null
    if (!course) return

    setSelectedCourse(course)
    setError('')
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Course Lessons</h2>
          <p className="mt-1 text-sm text-gray-500">Select a course to manage its lessons.</p>
        </div>

        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">Course</span>
              <select
                value={courseId}
                onChange={event => handleCourseChange(event.target.value)}
                disabled={loadingCourses}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:bg-gray-50"
              >
                <option value="">{loadingCourses ? 'Loading courses...' : 'Select a course'}</option>
                {courses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}
              </select>
            </label>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!courseId}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>

        {selectedCourse && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedCourse.title}</h3>
                <p className="mt-1 text-sm text-gray-500">Course lesson management</p>
              </div>
              <Link to={`/admin/course-lessons/${selectedCourse.id}/add`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-purple-400">
                <span className="text-lg leading-none">+</span>
                Add Lesson
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="py-14 text-center text-sm text-gray-400">
                Section selection and existing lesson loading will be added here.
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
