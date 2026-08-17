import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import courseService from '../../../services/courseService'
import type { CourseDto } from '../../../types/course'

export default function CourseList() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<CourseDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [confirmId, setConfirmId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  const loadCourses = async () => {
    setLoading(true)
    try {
      const data = await courseService.getCourses()
      setCourses(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load courses.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.level.toLowerCase().includes(search.toLowerCase())
  )

  const handleRemove = async (id: number) => {
    setDeleting(true)
    try {
      await courseService.deleteCourse(id)
      setCourses(prev => prev.filter(c => c.id !== id))
      setConfirmId(null)
    } catch (err: any) {
      setError(err.message || 'Failed to remove course.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Course List</h2>
            <p className="text-sm text-gray-500 mt-1">{courses.length} courses on the platform</p>
          </div>
          <Link
            to="/admin/courses/add"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-indigo-500/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Course
          </Link>
        </div>

        {error && (
          <div className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or level..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white"
          />
        </div>

        <p className="text-sm text-gray-500">
          Showing <strong className="text-gray-900">{filtered.length}</strong> course{filtered.length !== 1 ? 's' : ''}
          {search ? ` for "${search}"` : ''}
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-16 text-sm text-gray-400">Loading courses...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No courses match your search.</p>
              <button
                onClick={() => setSearch('')}
                className="mt-3 text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map(course => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-11 h-11 rounded-xl object-cover shrink-0 bg-gray-100"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{course.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[0.68rem] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                        {course.level}
                      </span>
                      {!course.isPublished && (
                        <span className="text-[0.68rem] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                          Unpublished
                        </span>
                      )}
                      <span className="text-xs font-semibold text-green-600">
                        ₹{course.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => navigate(`/admin/assessments/view/${course.id}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-150 cursor-pointer"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                      View Assessments
                    </button>
                    <button
                      onClick={() => setConfirmId(course.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 border border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-150 cursor-pointer"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {confirmId !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-8 max-w-[380px] w-full shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Remove Course</h3>
            <p className="text-sm text-gray-500 text-center mb-2">
              Are you sure you want to remove{' '}
              <span className="font-medium text-gray-700">
                {courses.find(c => c.id === confirmId)?.title}
              </span>
              ?
            </p>
            <p className="text-xs text-amber-600 text-center mb-6">
              This will also permanently delete its sections, lessons, and assessment data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-600 transition-colors cursor-pointer disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemove(confirmId)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60"
              >
                {deleting ? 'Removing...' : 'Yes, remove'}
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  )
}