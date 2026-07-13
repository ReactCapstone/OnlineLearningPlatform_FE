import { useState } from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white px-6 py-12">
      <div className="max-w-[600px] mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center justify-center w-9 h-9 bg-indigo rounded-lg mb-6">
            <span className="font-display font-extrabold text-white text-base">L</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Your Profile</h1>
          <p className="text-gray-500 text-sm">Manage your personal information and expertise.</p>
        </div>

        {/* Avatar placeholder */}
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-indigo/10 flex items-center justify-center text-2xl font-display font-bold text-indigo">
            {form.firstName ? form.firstName[0].toUpperCase() : '?'}
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {form.firstName || form.lastName
                ? `${form.firstName} ${form.lastName}`.trim()
                : 'Your Name'}
            </p>
            <p className="text-sm text-gray-400">{form.email || 'your@email.com'}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">First Name</span>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jane"
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/20 transition-all"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">Last Name</span>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/20 transition-all"
              />
            </label>
          </div>

          {/* Email */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Email Address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/20 transition-all"
            />
          </label>

          {/* Years of Experience */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Years of Experience</span>
            <input
              type="number"
              name="yearsOfExperience"
              value={form.yearsOfExperience}
              onChange={handleChange}
              placeholder="e.g. 3"
              min="0"
              max="50"
              className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/20 transition-all"
            />
          </label>

          {/* Area of Expertise */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Area of Expertise</span>
            <select
              name="areaOfExpertise"
              value={form.areaOfExpertise}
              onChange={handleChange}
              className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/20 transition-all bg-white appearance-none cursor-pointer"
            >
              <option value="" disabled>Select your area</option>
              {EXPERTISE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
            <p className="text-xs text-gray-400">
              Changes will be saved once backend is connected.
            </p>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-indigo hover:bg-indigo-light text-white text-sm font-semibold transition-colors duration-200 cursor-pointer"
            >
              Save changes
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}