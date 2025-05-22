import { useTasks } from '../../hooks/useTasks'
import TaskList from '../../components/tasks/TaskList'
// Removed useEffect as useTasks handles initial fetch

const TaskBoard = ({ onEdit }) => {
  // fetchTasks removed, error state accessed
  const { tasks, loading, error, removeTask } = useTasks()

  // useEffect calling fetchTasks removed - useTasks handles initial load.

  const handleEdit = (task) => {
    onEdit(task)
  }

  // handleDelete now relies on useTasks's removeTask to handle errors
  // and set the error state within the hook.
  const handleDelete = async (taskId) => {
    await removeTask(taskId)
    // No local try-catch needed here, error will be set in useTasks
  }

  return (
    <TaskList tasks={tasks} loading={loading} error={error} onEdit={handleEdit} onDelete={handleDelete} />
  )
}

export default TaskBoard
