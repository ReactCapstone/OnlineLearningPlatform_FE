import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0D1B2A] pt-14 pb-6 px-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-[1200px] mx-auto flex gap-16 flex-wrap pb-12 border-b border-white/10">

        {/* Brand */}
        <div className="flex-1 min-w-[200px]">
          <Link to="/" className="flex items-center gap-1.5 mb-3">
            <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-extrabold text-base rounded-lg">
              NV
            </span>
            <span className="font-bold text-lg text-slate-100 ml-1">
              LearnHub
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-[220px] leading-relaxed">
            Expand your skills. Accelerate your career.
          </p>
        </div>

        {/* Nav columns */}
        <nav className="flex gap-12 flex-wrap">
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[0.78rem] font-bold tracking-widest uppercase text-slate-100 mb-1">
              Platform
            </h4>
            <Link to="/" className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-150">Home</Link>
            <Link to="/courses" className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-150">Courses</Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[0.78rem] font-bold tracking-widest uppercase text-slate-100 mb-1">
              Account
            </h4>
            <Link to="/login" className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-150">Log in</Link>
            <Link to="/profile" className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-150">Profile</Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[0.78rem] font-bold tracking-widest uppercase text-slate-100 mb-1">
              Company
            </h4>
            <span className="text-sm text-slate-400 cursor-pointer hover:text-slate-100 transition-colors duration-150">About us</span>
            <span className="text-sm text-slate-400 cursor-pointer hover:text-slate-100 transition-colors duration-150">Careers</span>
            <span className="text-sm text-slate-400 cursor-pointer hover:text-slate-100 transition-colors duration-150">Contact</span>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto mt-6 flex justify-between items-center flex-wrap gap-3">
        <p className="text-[0.8rem] text-slate-500">
          © {new Date().getFullYear()} Learnify. All rights reserved.
        </p>
        <div className="flex gap-5">
          <span className="text-[0.8rem] text-slate-500 cursor-pointer hover:text-slate-100 transition-colors duration-150">Privacy Policy</span>
          <span className="text-[0.8rem] text-slate-500 cursor-pointer hover:text-slate-100 transition-colors duration-150">Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}