import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { registerUser } from '../redux/auth/authSlice'
import { selectAuthLoading, selectAuthError } from '../redux/auth/authSelectors'

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

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    yearsOfExperience: '',
    areaOfExpertise: '',
  })

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    yearsOfExperience: '',
    areaOfExpertise: '',
  }

  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuccess, setShowSuccess] = useState(false)

  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectAuthLoading)
  const apiError = useAppSelector(selectAuthError)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required.'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required.'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (!form.password) {
      newErrors.password = 'Password is required.'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match."
    }
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    const result = await dispatch(registerUser({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      yearsOfExperience: form.yearsOfExperience === '' ? null : Number(form.yearsOfExperience),
      areaOfExpertise: form.areaOfExpertise === '' ? null : form.areaOfExpertise,
    }))
    if (registerUser.fulfilled.match(result)) {
      setShowSuccess(true)
    }
  }

  const stayOnPage = () => {
    setShowSuccess(false)
    setForm(initialFormState)
    setErrors({})
  }

  const inputClass = (hasError?: string) =>
    `px-4 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all
    ${hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200'
      : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
    }`

  return (
    <div className="min-h-screen bg-white px-6 py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-[560px] mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-9 h-9 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-lg mb-6">
            <span className="font-extrabold text-white text-base">NV</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Create an account</h1>
          <p className="text-gray-500 text-sm">Start your learning journey with Learnify.</p>
        </div>

        {/* API error banner */}
        {apiError && (
          <div className="mb-5 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {apiError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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
                className={inputClass(errors.firstName)}
              />
              {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">Last Name</span>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className={inputClass(errors.lastName)}
              />
              {errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}
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
              className={inputClass(errors.email)}
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
          </label>

          {/* Password row */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputClass(errors.password)}
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">Confirm Password</span>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputClass(errors.confirmPassword)}
              />
              {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword}</span>}
            </label>
          </div>

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
              className={inputClass()}
            />
          </label>

          {/* Area of Expertise */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Area of Expertise</span>
            <select
              name="areaOfExpertise"
              value={form.areaOfExpertise}
              onChange={handleChange}
              className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white cursor-pointer"
            >
              <option value="" disabled>Select your area</option>
              {EXPERTISE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
            Log in
          </Link>
        </p>

      </div>

      {/* Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-8 max-w-[380px] w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account created!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Welcome to Learnify, <span className="font-medium text-gray-700">{form.firstName}</span>! Your account has been successfully created.
            </p>
            <Link
              to="/login"
              className="block w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all duration-200 text-center"
              onClick={() => setShowSuccess(false)}
            >
              Go to login
            </Link>
            <button
              onClick={stayOnPage}
              className="mt-3 w-full py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-600 transition-colors duration-200 cursor-pointer"
            >
              Stay on page
            </button>
          </div>
        </div>
      )}
    </div>
  )
}