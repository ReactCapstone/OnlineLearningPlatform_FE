import { useState } from 'react'
import { User, Mail, Briefcase, Clock, ChevronDown } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout'

const EXPERTISE_OPTIONS = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'UI/UX Design',
  'Data Science',
  'Machine Learning',
  'DevOps & Cloud',
  'Mobile Development',
  'Cybersecurity',
  'Other',
]

export default function Profile() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    yearsOfExperience: '',
    areaOfExpertise: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect to backend
    console.log('Form submitted:', form)
  }

  // Purely presentational — mirrors the "stat" language used on the dashboard
  const filledCount = Object.values(form).filter(Boolean).length
  const completeness = Math.round((filledCount / 5) * 100)

  return (
    <DashboardLayout>
      <div >

        {/* Gradient hero banner, matches dashboard welcome banner */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-500 p-6 sm:p-8 mb-8 shadow-lg shadow-indigo-600/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {/* <div className="w-16 h-16 shrink-0 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-2xl font-display font-bold text-white border-2 border-white/25">
              {form.firstName ? form.firstName[0].toUpperCase() : '?'}
            </div> */}
            <div className="w-16 h-16 shrink-0 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-2xl font-display font-bold text-white border-2 border-white/25">
              {form.firstName ? (
                form.firstName[0].toUpperCase()
              ) : (
                <User className="w-7 h-7 text-white" />
              )}
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-bold text-white mb-0.5 truncate">
                {form.firstName || form.lastName
                  ? `${form.firstName} ${form.lastName}`.trim()
                  : 'Your Profile'}
              </h1>
              <p className="text-indigo-100 text-sm truncate">
                {form.email || 'Manage your personal information and expertise'}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-center justify-center bg-white/15 backdrop-blur rounded-xl px-5 py-3 border border-white/20 shrink-0">
            <span className="text-xs text-indigo-100 font-medium">Complete</span>
            <span className="text-xl font-bold text-white">{completeness}%</span>
          </div>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-6">

          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                First Name
              </span>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jane"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                Last Name
              </span>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
          </div>

          {/* Email */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              Email Address
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          {/* Years of Experience */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              Years of Experience
            </span>
            <input
              type="number"
              name="yearsOfExperience"
              value={form.yearsOfExperience}
              onChange={handleChange}
              placeholder="e.g. 3"
              min="0"
              max="50"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          {/* Area of Expertise */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              Area of Expertise
            </span>
            <div className="relative">
              <select
                name="areaOfExpertise"
                value={form.areaOfExpertise}
                onChange={handleChange}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition cursor-pointer focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="" disabled>Select your area</option>
                {EXPERTISE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </label>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
            <p className="text-xs text-gray-400">
              Changes will be saved once backend is connected.
            </p>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-500 hover:opacity-90 text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm shadow-indigo-600/30"
            >
              Save changes
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  )
}