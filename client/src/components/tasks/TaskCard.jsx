import Button from '../common/Button'

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-700'
    case 'Medium': return 'bg-yellow-100 text-yellow-700'
    case 'Low': return 'bg-green-100 text-green-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColor = getPriorityColor(task.priority);
  const handleEdit = () => {
    onEdit(task)
  }

  const handleDelete = () => {
    onDelete(task.id)
  }

  return (
    <div className="p-4 border rounded shadow-sm mb-2 flex justify-between items-center relative">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{task.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColor}`}>
            {task.priority}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        {task.dueDate && (
          
          <p className="text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600">Edit</Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
      </div>
    </div>
  )
}
export default TaskCard