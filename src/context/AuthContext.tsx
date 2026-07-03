import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// Types

interface User {
    id: string
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    error: string | null
    clearError: () => void
}

// Context

const AuthContext = createContext<AuthContextType | null > (null)

// Provider

export function AuthProvider ({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Check if user is already logged in (e.g., from localStorage)
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        try {
      // ── TODO: replace this block with your real backend call ──────────────
      // const response = await fetch('https://your-api.com/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })
      // if (!response.ok) throw new Error('Invalid email or password')
      // const data = await response.json()
      // const { user, token } = data
      // ── End TODO ──────────────────────────────────────────────────────────

      // Mock response — remove once backend is ready
      await new Promise(resolve => setTimeout(resolve, 800)) // simulate network delay
      const mockUser: User = { id: '1', name: 'Test User', email }
      const mockToken = 'mock_jwt_token'
      const user = mockUser
      const token = mockToken

      // Store in state + localStorage
      setUser(user)
      setToken(token)
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(user))

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      error,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}