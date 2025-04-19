import { createContext, useContext, useState, useEffect } from 'react'
import { login as authLogin, logout as authLogout, register as authRegister } from '../services/authService'

// Create context
const AuthContext = createContext()

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    if (token && email) {
      setUser({ email, token })
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const data = await authLogin(credentials)
      setUser({ email: data.email, token: data.token })
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.email)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleRegister = async (credentials) => {
    try {
      const data = await authRegister(credentials)
      setUser({ email: data.email, token: data.token })
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.email)
    } catch (error) {
      console.error('Register failed:', error)
    }
  }

  const handleLogout = () => {
    authLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use context
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext must be used within AuthProvider')
  return context
}
