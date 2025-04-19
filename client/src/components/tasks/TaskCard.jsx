import Button from '../common/Button'

const TaskCard = ({ task, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(task)
  }

  const handleDelete = () => {
    onDelete(task.id)
  }

  return (
    <div className="p-4 border rounded shadow-sm mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600">Edit</Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
      </div>
    </div>
  )
}
export default TaskCard
