import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/common/Modal/Modal'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  registerUser,
  sendOtp,
  verifyOtp,
} from '../redux/auth/authSlice'
import {
  selectAuthLoading,
  selectAuthError,
} from '../redux/auth/authSelectors'

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
  otp?: string
  password?: string
  confirmPassword?: string
}

export default function Register() {

  // ---------------------------------------------
  // Registration step
  // 1 = Email
  // 2 = OTP
  // 3 = Complete registration
  // ---------------------------------------------

  const [step, setStep] = useState(1)

  // ---------------------------------------------
  // Form
  // ---------------------------------------------

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    yearsOfExperience: '',
    areaOfExpertise: '',
  })

  // ---------------------------------------------
  // OTP
  // ---------------------------------------------

  const [otp, setOtp] = useState('')

  const [verificationToken, setVerificationToken] =
    useState('')

  // ---------------------------------------------
  // UI state
  // ---------------------------------------------

  const [errors, setErrors] =
    useState<FormErrors>({})

  const [showSuccess, setShowSuccess] =
    useState(false)

  const dispatch = useAppDispatch()

  const loading =
    useAppSelector(selectAuthLoading)

  const apiError =
    useAppSelector(selectAuthError)

  // ---------------------------------------------
  // Input change
  // ---------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value,
    }))

    setErrors(prev => ({
      ...prev,
      [name]: undefined,
    }))
  }

  // ---------------------------------------------
  // Validate email
  // ---------------------------------------------

  const validateEmail = (): boolean => {

    const newErrors: FormErrors = {}

    if (!form.email.trim()) {

      newErrors.email =
        'Email is required.'

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {

      newErrors.email =
        'Enter a valid email address.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // ---------------------------------------------
  // STEP 1
  // Send OTP
  // ---------------------------------------------

  const handleSendOtp = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    if (!validateEmail()) {
      return
    }

    const result = await dispatch(
      sendOtp({
        email: form.email.trim(),
      })
    )

    if (sendOtp.fulfilled.match(result)) {

      setErrors({})

      setOtp('')

      setStep(2)
    }
  }

  // ---------------------------------------------
  // STEP 2
  // Verify OTP
  // ---------------------------------------------

  const handleVerifyOtp = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setErrors({})

    if (!otp.trim()) {

      setErrors({
        otp: 'Please enter the OTP.',
      })

      return
    }

    if (!/^\d{6}$/.test(otp)) {

      setErrors({
        otp: 'OTP must be exactly 6 digits.',
      })

      return
    }

    const result = await dispatch(
      verifyOtp({
        email: form.email.trim(),
        otpCode: otp,
      })
    )

    if (verifyOtp.fulfilled.match(result)) {

      setVerificationToken(
        result.payload.verificationToken
      )

      setErrors({})

      setStep(3)
    }
  }

  // ---------------------------------------------
  // STEP 3
  // Validate registration
  // ---------------------------------------------

  const validateRegistration =
    (): FormErrors => {

      const newErrors: FormErrors = {}

      if (!form.firstName.trim()) {

        newErrors.firstName =
          'First name is required.'
      }

      if (!form.lastName.trim()) {

        newErrors.lastName =
          'Last name is required.'
      }

      if (!form.password) {

        newErrors.password =
          'Password is required.'

      } else if (form.password.length < 6) {

        newErrors.password =
          'Password must be at least 6 characters.'
      }

      if (!form.confirmPassword) {

        newErrors.confirmPassword =
          'Please confirm your password.'

      } else if (
        form.password !== form.confirmPassword
      ) {

        newErrors.confirmPassword =
          "Passwords don't match."
      }

      return newErrors
    }

  // ---------------------------------------------
  // STEP 3
  // Register
  // ---------------------------------------------

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    const validationErrors =
      validateRegistration()

    if (
      Object.keys(validationErrors).length > 0
    ) {

      setErrors(validationErrors)

      return
    }

    const result = await dispatch(
      registerUser({

        verificationToken,

        firstName:
          form.firstName.trim(),

        lastName:
          form.lastName.trim(),

        email:
          form.email.trim(),

        password:
          form.password,

        confirmPassword:
          form.confirmPassword,

        yearsOfExperience:
          form.yearsOfExperience === ''
            ? null
            : Number(
              form.yearsOfExperience
            ),

        areaOfExpertise:
          form.areaOfExpertise === ''
            ? null
            : form.areaOfExpertise,
      })
    )

    if (registerUser.fulfilled.match(result)) {

      setShowSuccess(true)
    }
  }

  // ---------------------------------------------
  // Back
  // ---------------------------------------------

  const handleBack = () => {

    setErrors({})

    if (step === 2) {

      setStep(1)

      setOtp('')

      return
    }

    if (step === 3) {

      setStep(2)

      setVerificationToken('')
    }
  }

  // ---------------------------------------------
  // Reset
  // ---------------------------------------------

  const stayOnPage = () => {

    setShowSuccess(false)

    setStep(1)

    setForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      yearsOfExperience: '',
      areaOfExpertise: '',
    })

    setOtp('')

    setVerificationToken('')

    setErrors({})
  }

  // ---------------------------------------------
  // Input style
  // ---------------------------------------------

  const inputClass = (
    hasError?: string
  ) =>
    `px-4 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all
    ${hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200'
      : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
    }`

  // ---------------------------------------------
  // Heading
  // ---------------------------------------------

  const getTitle = () => {

    if (step === 1)
      return 'Verify your email'

    if (step === 2)
      return 'Enter verification code'

    return 'Complete your account'
  }

  const getDescription = () => {

    if (step === 1)
      return 'Enter your email address to get started.'

    if (step === 2)
      return `We sent a 6-digit OTP to ${form.email}`

    return 'Your email has been verified. Complete your profile.'
  }

  return (

    <div
      className="min-h-screen bg-white px-6 py-12"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >

      <div className="max-w-[560px] mx-auto">

        {/* Header */}

        <div className="mb-8">

          <Link
            to="/"
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-lg mb-6"
          >

            <span className="font-extrabold text-white text-lg">
              NV
            </span>

          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {getTitle()}
          </h1>

          <p className="text-gray-500 text-sm">
            {getDescription()}
          </p>

        </div>

        {/* Progress */}

        <div className="flex items-center mb-8">

          <div
            className={`h-2 flex-1 rounded-l-full ${step >= 1
              ? 'bg-indigo-600'
              : 'bg-gray-200'
              }`}
          />

          <div
            className={`h-2 flex-1 ${step >= 2
              ? 'bg-indigo-600'
              : 'bg-gray-200'
              }`}
          />

          <div
            className={`h-2 flex-1 rounded-r-full ${step >= 3
              ? 'bg-indigo-600'
              : 'bg-gray-200'
              }`}
          />

        </div>

        {/* API Error */}

        {apiError && (

          <div className="mb-5 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">

            {apiError}

          </div>
        )}

        {/* ========================================= */}
        {/* STEP 1 - EMAIL */}
        {/* ========================================= */}

        {step === 1 && (

          <form
            onSubmit={handleSendOtp}
            className="flex flex-col gap-5"
          >

            <label className="flex flex-col gap-1.5">

              <span className="text-sm font-medium text-gray-700">
                Email Address
              </span>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                autoFocus
                className={inputClass(
                  errors.email
                )}
              />

              {errors.email && (

                <span className="text-xs text-red-500">
                  {errors.email}
                </span>

              )}

            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
            >

              {loading
                ? 'Sending OTP...'
                : 'Get OTP'}

            </button>

          </form>
        )}

        {/* ========================================= */}
        {/* STEP 2 - OTP */}
        {/* ========================================= */}

        {step === 2 && (

          <form
            onSubmit={handleVerifyOtp}
            className="flex flex-col gap-5"
          >

            <label className="flex flex-col gap-1.5">

              <span className="text-sm font-medium text-gray-700">
                Verification Code
              </span>

              <input
                type="text"
                value={otp}
                onChange={(e) => {

                  const value =
                    e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 6)

                  setOtp(value)

                  setErrors(prev => ({
                    ...prev,
                    otp: undefined,
                  }))
                }}
                placeholder="Enter 6-digit OTP"
                inputMode="numeric"
                maxLength={6}
                autoFocus
                className={`${inputClass(
                  errors.otp
                )} text-center text-2xl tracking-[0.5em]`}
              />

              {errors.otp && (

                <span className="text-xs text-red-500">
                  {errors.otp}
                </span>

              )}

            </label>

            <button
              type="submit"
              disabled={
                loading ||
                otp.length !== 6
              }
              className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
            >

              {loading
                ? 'Verifying...'
                : 'Verify'}

            </button>

            <button
              type="button"
              onClick={handleBack}
              className="w-full py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-600 transition-colors cursor-pointer"
            >

              Change email

            </button>

          </form>
        )}

        {/* ========================================= */}
        {/* STEP 3 - REGISTRATION */}
        {/* ========================================= */}

        {step === 3 && (

          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-5"
          >

            {/* Verified email */}

            <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200">

              <div className="flex items-center gap-2">

                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">

                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >

                    <path d="M20 6L9 17l-5-5" />

                  </svg>

                </div>

                <span className="text-sm font-medium text-green-700">
                  Email verified
                </span>

              </div>

              <p className="text-sm text-green-600 mt-1 ml-7">
                {form.email}
              </p>

            </div>

            {/* Name */}

            <div className="grid grid-cols-2 gap-4">

              <label className="flex flex-col gap-1.5">

                <span className="text-sm font-medium text-gray-700">
                  First Name
                </span>

                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  className={inputClass(
                    errors.firstName
                  )}
                />

                {errors.firstName && (

                  <span className="text-xs text-red-500">
                    {errors.firstName}
                  </span>

                )}

              </label>

              <label className="flex flex-col gap-1.5">

                <span className="text-sm font-medium text-gray-700">
                  Last Name
                </span>

                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={inputClass(
                    errors.lastName
                  )}
                />

                {errors.lastName && (

                  <span className="text-xs text-red-500">
                    {errors.lastName}
                  </span>

                )}

              </label>

            </div>

            {/* Password */}

            <div className="grid grid-cols-2 gap-4">

              <label className="flex flex-col gap-1.5">

                <span className="text-sm font-medium text-gray-700">
                  Password
                </span>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={inputClass(
                    errors.password
                  )}
                />

                {errors.password && (

                  <span className="text-xs text-red-500">
                    {errors.password}
                  </span>

                )}

              </label>

              <label className="flex flex-col gap-1.5">

                <span className="text-sm font-medium text-gray-700">
                  Confirm Password
                </span>

                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={inputClass(
                    errors.confirmPassword
                  )}
                />

                {errors.confirmPassword && (

                  <span className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </span>

                )}

              </label>

            </div>

            {/* Experience */}

            <label className="flex flex-col gap-1.5">

              <span className="text-sm font-medium text-gray-700">
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
                className={inputClass()}
              />

            </label>

            {/* Expertise */}

            <label className="flex flex-col gap-1.5">

              <span className="text-sm font-medium text-gray-700">
                Area of Expertise
              </span>

              <select
                name="areaOfExpertise"
                value={form.areaOfExpertise}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white cursor-pointer"
              >

                <option value="" disabled>
                  Select your area
                </option>

                {EXPERTISE_OPTIONS.map(
                  opt => (

                    <option
                      key={opt}
                      value={opt}
                    >
                      {opt}
                    </option>

                  )
                )}

              </select>

            </label>

            {/* Register */}
            <button
              type="submit"
              disabled={
                loading ||
                !verificationToken
              }
              className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
            >
              {loading
                ? 'Creating account...'
                : 'Create account'}
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="w-full py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-600 transition-colors cursor-pointer"
            >
              Back
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <Modal
          onClose={() =>
            setShowSuccess(false)
          }
          ariaLabel="Account created"
        >

          <div className="bg-white rounded-2xl p-8 max-w-[380px] w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Account created!
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Welcome to Learnify,{' '}
              <span className="font-medium text-gray-700">
                {form.firstName}
              </span>
              ! Your account has been successfully created.
            </p>
            <Link
              to="/login"
              className="block w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all duration-200 text-center"
              onClick={() =>
                setShowSuccess(false)
              }
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
        </Modal>
      )}
    </div>
  )
}