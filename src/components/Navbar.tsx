import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-100 bg-navy/85 backdrop-blur-md border-b border-white/8">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center gap-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0">
          <span className="flex items-center justify-center w-8 h-8 bg-indigo text-white font-display font-extrabold text-base rounded-lg">
            NV
          </span>
          <span className="font-display font-bold text-lg text-white-soft ml-1">
            LearnHub
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1.5 flex-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors duration-150
                ${isActive
                  ? 'text-white-soft bg-white/8'
                  : 'text-muted hover:text-white-soft hover:bg-white/6'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2.5 ml-auto">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white-soft border border-white/8 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
          >
            Log in
          </Link>
          <Link
            to="/profile"
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo hover:bg-indigo-light hover:-translate-y-px hover:shadow-lg hover:shadow-indigo/40 transition-all duration-200"
          >
            Get started
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden ml-auto flex flex-col gap-1.5 p-1.5 bg-transparent border-none cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5.5 h-0.5 bg-white-soft rounded transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5.5 h-0.5 bg-white-soft rounded transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5.5 h-0.5 bg-white-soft rounded transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden flex flex-col gap-1 px-6 pt-3 pb-5 border-t border-white/8">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                ${isActive
                  ? 'text-white-soft bg-white/8'
                  : 'text-muted hover:text-white-soft hover:bg-white/6'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <div className="flex gap-2.5 mt-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white-soft border border-white/8 hover:bg-white/5 transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <Link
              to="/profile"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo hover:bg-indigo-light transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}