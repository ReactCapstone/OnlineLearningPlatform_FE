import { useMemo, useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { studentNotifications } from '../../../data/studentNotifications'

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = useMemo(
    () => studentNotifications.filter(item => item.unread).length,
    []
  )

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="relative rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
        aria-label="Notifications"
      >
        <FiBell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">Notifications</p>
            <button
              type="button"
              className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {studentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50 ${
                  notification.unread ? 'bg-indigo-50/30' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                      {notification.unread && (
                        <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{notification.message}</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">
                    {notification.type}
                  </span>
                  <span className="text-[11px] text-slate-400">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationMenu;