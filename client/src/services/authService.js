import API from './api'

const saveToken = (token) => {
  localStorage.setItem('token', token)
}

const removeToken = () => {
  localStorage.removeItem('token')
}

export const register = async (userData) => {
  try {
    const res = await API.post('/auth/register', userData)
    saveToken(res.data.token)
    return res.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const login = async (userData) => {
  const res = await API.post('/auth/login', userData)
  saveToken(res.data.token)
  return res.data
}
export const logout = () => removeToken()
