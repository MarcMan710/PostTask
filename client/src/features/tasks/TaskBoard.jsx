import { useTasks } from '../../hooks/useTasks'
import TaskList from '../../components/tasks/TaskList'
import { useEffect } from 'react'

const TaskBoard = ({ onEdit }) => {
  const { tasks, loading, removeTask, fetchTasks } = useTasks()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleEdit = (task) => {
    onEdit(task)
  }

  const handleDelete = async (taskId) => {
    try {
      await removeTask(taskId)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <TaskList tasks={tasks} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
  )
}

export default TaskBoard
