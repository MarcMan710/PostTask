import API from './api'

const taskService = {
  async fetchTasks() {
    try {
      const res = await API.get('/tasks')
      return res.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async createTask(taskData) {
    const res = await API.post('/tasks', taskData)
    return res.data
  },

  async updateTask(taskId, taskData) {
    const res = await API.put(`/tasks/${taskId}`, taskData)
    return res.data
  },

  async deleteTask(taskId) {
    const res = await API.delete(`/tasks/${taskId}`)
    return res.data
  },
}

export default taskService
