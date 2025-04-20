import API from './api'

export const fetchTasks = async () => {
  try {
    const res = await API.get('/tasks')
    return res.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const createTask = async (taskData) => {
  const res = await API.post('/tasks', taskData)
  return res.data
}

export const updateTask = async (taskId, taskData) => {
  const res = await API.put(`/tasks/${taskId}`, taskData)
  return res.data
}

export const deleteTask = async (taskId) => {
  const res = await API.delete(`/tasks/${taskId}`)
  return res.data
}
