import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout'

const notifications = [
  {
    id: 1,
    title: 'New lesson unlocked',
    message: 'A new lesson was published in your React Fundamentals course.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Quiz reminder',
    message: 'Your JavaScript quiz is due tomorrow at 11:59 PM.',
    time: '1 day ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Learning streak',
    message: 'You have maintained your 5-day learning streak. Keep going!',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 4,
    title: 'Certificate available',
    message: 'Your certificate for UI/UX Design Basics is ready to download.',
    time: '4 days ago',
    unread: false,
  },
]

export default function StudentNotifications() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-600">Student</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">Notifications</h2>
          </div>
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Mark all as read
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 last:border-b-0 ${
                item.unread ? 'bg-indigo-50/30' : 'bg-white'
              }`}
            >
              <div className="flex gap-3">
                <div className={`mt-1 h-2.5 w-2.5 rounded-full ${item.unread ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                <div>
                  <p className="text-base font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-slate-400">{item.time}</span>
                {item.unread && (
                  <button className="rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700">
                    New
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
