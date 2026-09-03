import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'
import { mockNotifications } from './mockNotifications'

export default function NotificationsPage() {
  const [search, setSearch] = useState('')

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return mockNotifications

    return mockNotifications.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.message.toLowerCase().includes(query) ||
      item.audience.toLowerCase().includes(query)
    )
  }, [search])

  const totalRecipients = mockNotifications.reduce((sum, item) => sum + item.recipients, 0)
  const publishedCount = mockNotifications.filter(item => item.status === 'Published').length
  const scheduledCount = mockNotifications.filter(item => item.status === 'Scheduled').length
  const unreadCount = mockNotifications.reduce((sum, item) => sum + item.unread, 0)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-600">Communication</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">Notifications & Announcements</h2>
          </div>

          <Link
            to="/admin/notifications/create"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:from-indigo-500 hover:to-purple-400"
          >
            + New announcement
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total recipients</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{totalRecipients}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Published</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{publishedCount}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Scheduled</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{scheduledCount}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Unread</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{unreadCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20L17 17" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search title, message or audience..."
              className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Audience</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Recipients</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredNotifications.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.sentAt}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {item.audience}
                      {item.courseName && <span className="mt-1 block text-xs text-slate-500">{item.courseName}</span>}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                        {item.type}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.status === 'Published'
                            ? 'bg-emerald-100 text-emerald-700'
                            : item.status === 'Scheduled'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      <p className="font-medium">{item.recipients}</p>
                      <p className="text-xs text-slate-500">{item.unread} unread</p>
                    </td>

                    <td className="px-6 py-4">
                      <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredNotifications.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-slate-500">No notifications found.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
