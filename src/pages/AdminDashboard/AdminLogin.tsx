import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) { setError('Email is required.'); return }
    if (!password) { setError('Password is required.'); return }

    setLoading(true)
    try {
      // TODO: replace with real admin auth API call
      // const response = await adminAuthService.login({ email, password })
      // if (response.role !== 'ADMIN') throw new Error('Unauthorized')

      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        // navigate('/');
        navigate('/admin/dashboard')
      }

    } catch (err) {
      setError('Invalid credentials or unauthorized access.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full max-w-[420px]">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="flex items-center justify-center w-9 h-9 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-extrabold text-sm rounded-xl">
                NV
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-base leading-tight">Learn Hub</span>
                <span className="text-[0.65rem] font-semibold text-indigo-600 uppercase tracking-widest">Admin Portal</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Sign in</h1>
            <p className="text-gray-500 text-sm">Access restricted to authorized personnel only.</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="shrink-0">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">Email Address</span>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="admin@learnhub.com"
                disabled={loading}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                disabled={loading}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 text-white text-sm font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </form>

          {/* Back to student login */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Not an admin?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
              Go to student login
            </Link>
          </p>

        </div>

        {/* Security note */}
        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Secure admin access — unauthorized attempts are logged
        </p>

      </div>
    </div>
  )
}