import { Link, useParams } from 'react-router-dom'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import { mockUsers } from './mockUsers'

export default function UserDetails() {
  const { userId } = useParams()
  const user = mockUsers.find(item => item.id === Number(userId))

  if (!user) {
    return (
      <AdminLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="text-lg font-semibold">User not found.</p>
          <Link to="/admin/users" className="mt-3 inline-block text-sm font-medium text-red-700 underline">
            Back to users
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link to="/admin/users" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              ← Back to users
            </Link>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">User Details</h2>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full object-cover ring-4 ring-indigo-100" />
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{user.name}</h3>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">{user.role}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  user.status === 'Active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : user.status === 'Inactive'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-amber-100 text-amber-700'
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Phone</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{user.phone}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Joined</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{user.joinDate}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Last active</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{user.lastActive}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Avg. progress</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{user.avgProgress}%</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Registered courses</h3>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                {user.totalCourses} courses
              </span>
            </div>

            <div className="space-y-4">
              {user.courses.map((course) => (
                <div key={course.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{course.title}</p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{course.category}</p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        course.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : course.status === 'In Progress'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-600">Learning progress</span>
                      <span className="font-semibold text-slate-900">{course.progress}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Lessons completed</p>
                      <p className="mt-1 font-semibold text-slate-900">{course.lessonsCompleted}/{course.totalLessons}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Enrolled</p>
                      <p className="mt-1 font-semibold text-slate-900">{course.enrollmentDate}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Last active</p>
                      <p className="mt-1 font-semibold text-slate-900">{course.lastActive}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Summary</h3>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Completed courses</span>
                  <span className="font-semibold text-slate-900">{user.completedCourses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">In progress</span>
                  <span className="font-semibold text-slate-900">{user.courses.filter(course => course.status === 'In Progress').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Not started</span>
                  <span className="font-semibold text-slate-900">{user.courses.filter(course => course.status === 'Not Started').length}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Quick notes</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                <li className="rounded-xl bg-slate-50 p-3">Strong engagement in Frontend and Backend learning paths.</li>
                <li className="rounded-xl bg-slate-50 p-3">Average completion pace is above the platform benchmark.</li>
                <li className="rounded-xl bg-slate-50 p-3">Needs follow-up on one pending course to improve consistency.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
