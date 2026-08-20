import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import { useAppDispatch } from '../../../redux/hooks'
import { logout } from '../../../redux/auth/authSlice'
import AdminSidebar from './AdminSidebar'

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    setIsMenuOpen(false)
    dispatch(logout())
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">

        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Manage your platform content</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
              Admin
            </span>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 text-slate-700 shadow-sm transition hover:border-violet-200 hover:bg-violet-50"
              >
                <img
                  src="src/assets/images/default-user.png"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover border border-slate-200 bg-slate-100"
                  alt="Admin"
                />
                <FiChevronDown size={16} className="mr-1 text-slate-500" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-12 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-8 py-8">
          {children}
        </main>

      </div>
    </div>
  )
}