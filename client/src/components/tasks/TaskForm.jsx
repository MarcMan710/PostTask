import { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'

const TaskForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [title, setTitle] = useState(initialData.title || '')
  const [description, setDescription] = useState(initialData.description || '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({ title, description })
    if (!isEditing) setTitle('')
    if (!isEditing) setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <Button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</Button>
    </form>
  )
}
export default TaskForm
