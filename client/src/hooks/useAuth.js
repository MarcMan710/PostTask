import { useState, useEffect } from 'react'
import { login, logout, register } from '../services/authService'

const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Optional: Decode token to get user info
      setUser({ token }) // or store decoded data
    }
  }, [])

  const handleLogin = async (credentials) => {
    const data = await login(credentials)
    setUser({ token: data.token, email: data.email })
  }

  const handleRegister = async (credentials) => {
    const data = await register(credentials)
    setUser({ token: data.token, email: data.email })
  }

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  return {
    user,
    isAuthenticated: !!user,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  }
}

export default useAuth
