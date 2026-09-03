import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout'

export default function CreateAnnouncement() {
  const [form, setForm] = useState({
    title: '',
    audience: 'All Students',
    course: '',
    type: 'Announcement',
    priority: 'Normal',
    status: 'Draft',
    message: '',
    scheduleAt: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <div>
          <Link to="/admin/notifications" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            ← Back to notifications
          </Link>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Create Announcement</h2>
        </div>

        {submitted && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            Announcement drafted successfully. It is ready to be published.
          </div>
        )}

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={event => handleChange('title', event.target.value)}
                placeholder="New lesson published"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Audience</label>
              <select
                value={form.audience}
                onChange={event => handleChange('audience', event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option>All Students</option>
                <option>Course Students</option>
                <option>Selected Users</option>
                <option>Admins</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Course</label>
              <input
                type="text"
                value={form.course}
                onChange={event => handleChange('course', event.target.value)}
                placeholder="Optional course name"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Type</label>
              <select
                value={form.type}
                onChange={event => handleChange('type', event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option>Announcement</option>
                <option>Reminder</option>
                <option>System Update</option>
                <option>Warning</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Priority</label>
              <select
                value={form.priority}
                onChange={event => handleChange('priority', event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
              <select
                value={form.status}
                onChange={event => handleChange('status', event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option>Draft</option>
                <option>Published</option>
                <option>Scheduled</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Schedule date</label>
              <input
                type="datetime-local"
                value={form.scheduleAt}
                onChange={event => handleChange('scheduleAt', event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
              <textarea
                rows={6}
                value={form.message}
                onChange={event => handleChange('message', event.target.value)}
                placeholder="Write the announcement details here..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Link
              to="/admin/notifications"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:from-indigo-500 hover:to-purple-400"
            >
              Save announcement
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
