import TaskCard from './TaskCard'
import Spinner from '../common/Spinner'
import { useState } from 'react'

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  const [showCompleted, setShowCompleted] = useState(false)

  if (loading) return <Spinner />
  if (!tasks.length) return <p>No tasks yet.</p>

  const filteredTasks = showCompleted ? tasks : tasks.filter(task => !task.completed)

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => setShowCompleted(!showCompleted)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{showCompleted ? 'Hide Completed' : 'Show Completed'}</button>
      </div>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
export default TaskList
