import Button from '../common/Button';
import { getPriorityColor } from '../../utils/styleUtils';

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
        <div className='flex items-center mt-1'>
        {task.category && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
            {task.category}
          </span>
        )}
        {task.dueDate && (
          <p className="text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600">Edit</Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
      </div>
    </div>
  )
}
export default TaskCard
