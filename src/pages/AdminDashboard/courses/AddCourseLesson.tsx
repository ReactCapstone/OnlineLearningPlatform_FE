import { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import courseService from '../../../services/courseService'
import type { CourseDto } from '../../../types/course'
import sectionService, { type SectionDto } from '../../../services/sectionService'
import lessonService, { ADMIN_LESSONS_STORAGE_KEY, type LessonDto, type LocalAdminLesson } from '../../../services/lessonService'
import { Link } from 'react-router-dom'
// Section and lesson APIs will be added back when section selection is enabled.
// import sectionService, { type SectionDto } from '../../../services/sectionService'
// import lessonService, { type LessonDto } from '../../../services/lessonService'

export default function AddCourseLesson() {
  const [courses, setCourses] = useState<CourseDto[]>([])
  const [courseId, setCourseId] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<CourseDto | null>(null)
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [loadingLessons, setLoadingLessons] = useState(false)
  const [sections, setSections] = useState<SectionDto[]>([])
  const [lessons, setLessons] = useState<Record<number, LessonDto[]>>({})
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
    void loadLessons(course.id)
  }

  const loadLessons = async (selectedCourseId: number) => {
    setLoadingLessons(true)
    try {
      const sectionData = await sectionService.getSections(selectedCourseId)
      const lessonGroups = await Promise.all(sectionData.map(async section => [section.id, await lessonService.getLessons(section.id)] as const))
      const storedLessons = JSON.parse(localStorage.getItem(ADMIN_LESSONS_STORAGE_KEY) ?? '[]') as LocalAdminLesson[]
      const localLessons = storedLessons.filter(lesson => lesson.courseId === selectedCourseId)
      const nextLessons: Record<number, LessonDto[]> = Object.fromEntries(lessonGroups)
      const firstSectionId = sectionData[0]?.id ?? 0
      if (localLessons.length > 0) nextLessons[firstSectionId] = [...(nextLessons[firstSectionId] ?? []), ...localLessons]
      setSections(sectionData.length > 0 ? sectionData : localLessons.length > 0 ? [{ id: 0, courseId: selectedCourseId, title: 'Added lessons', orderIndex: 0 }] : [])
      setLessons(nextLessons)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lessons.')
    } finally {
      setLoadingLessons(false)
    }
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
              {loadingLessons ? (
                <div className="py-14 text-center text-sm text-gray-400">Loading lessons...</div>
              ) : sections.length === 0 ? (
                <div className="py-14 text-center text-sm text-gray-400">No sections or lessons found for this course.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {sections.map(section => (
                    <div key={section.id} className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="font-semibold text-gray-900">{section.title}</h4>
                        <span className="text-xs text-gray-400">{lessons[section.id]?.length ?? 0} lessons</span>
                      </div>
                      {(lessons[section.id]?.length ?? 0) > 0 ? (
                        <div className="mt-3 space-y-2">
                          {lessons[section.id].map(lesson => (
                            <div key={lesson.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                                <p className="mt-1 text-xs text-gray-500">{lesson.videoUrl ? 'Video lesson' : 'Lesson content'}</p>
                              </div>
                              <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">Published</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-3 text-sm text-gray-400">No lessons added yet.</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
