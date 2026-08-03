import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import { Link } from 'react-router-dom'
import { ALL_COURSES } from '../../data/courses'

const STATS = [
  {
    label: 'Total Courses',
    value: `${ALL_COURSES.length}`,
    change: '+2 this month',
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    label: 'Total Students',
    value: '1,240',
    change: '+84 this month',
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    color: 'bg-purple-50 text-purple-600',
  },
  {
    label: 'Total Assessments',
    value: '36',
    change: '+5 this month',
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    color: 'bg-amber-50 text-amber-600',
  },
  {
    label: 'Completion Rate',
    value: '78%',
    change: '+3% this month',
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: 'bg-green-50 text-green-600',
  },
]

const QUICK_ACTIONS = [
  {
    label: 'Add Course',
    description: 'Create and publish a new course',
    to: '/admin/courses/add',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-100',
    hoverBg: 'hover:bg-indigo-600',
    hoverText: 'hover:text-white',
    hoverBorder: 'hover:border-indigo-600',
  },
  {
    label: 'Course List',
    description: 'View, manage and remove courses',
    to: '/admin/courses/list',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-100',
    hoverBg: 'hover:bg-purple-600',
    hoverText: 'hover:text-white',
    hoverBorder: 'hover:border-purple-600',
  },
  {
    label: 'Add Assessment',
    description: 'Create a new assessment for a course',
    to: '/admin/assessments/add',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-100',
    hoverBg: 'hover:bg-amber-500',
    hoverText: 'hover:text-white',
    hoverBorder: 'hover:border-amber-500',
  },
  {
    label: 'View Assessments',
    description: 'Browse all assessments by course',
    to: '/admin/assessments/view',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    borderColor: 'border-green-100',
    hoverBg: 'hover:bg-green-600',
    hoverText: 'hover:text-white',
    hoverBorder: 'hover:border-green-600',
  },
]

const RECENT_COURSES = ALL_COURSES.slice(0, 4)

export default function AdminHome() {
  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Welcome banner */}
        <div
          className="rounded-2xl p-6 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}
        >
          <div>
            <p className="text-indigo-200 text-sm font-medium mb-1">Welcome back</p>
            <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
            <p className="text-indigo-200 text-sm mt-1">Here's what's happening on your platform today.</p>
          </div>
          <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STATS.map(({ label, value, change, positive, icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                  {icon}
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className={`text-xs font-medium mt-1 ${positive ? 'text-green-600' : 'text-red-500'}`}>
                  {change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {QUICK_ACTIONS.map(({ label, description, to, icon, bgColor, textColor, borderColor, hoverBg, hoverText, hoverBorder }) => (
              <Link
                key={label}
                to={to}
                className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${bgColor} ${textColor} ${borderColor} ${hoverBg} ${hoverText} ${hoverBorder} group`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs opacity-70 mt-0.5">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Recent Courses</h3>
            <Link to="/admin/courses/list" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              View all
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Course</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Category</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Lessons</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Price</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_COURSES.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{course.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{course.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[0.72rem] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.lessons} lessons</td>
                    <td className="px-6 py-4 text-sm text-gray-600">₹{course.price.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/assessments/view/${course.id}`}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                      >
                        View Assessments
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}