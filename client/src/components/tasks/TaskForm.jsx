import { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import Select from '../common/Select';

const TaskForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [title, setTitle] = useState(initialData.title || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [dueDate, setDueDate] = useState(initialData.dueDate || '');
  const [priority, setPriority] = useState(initialData.priority || 'Medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      dueDate, 
      priority

    };
    await onSubmit(formData);
    if (!isEditing) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      {/* NEW: Add date input */}
      <Input 
        type="date" 
        label="Due Date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
        required
      />
      <Select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        options={['High', 'Medium', 'Low']}
      />
      <Button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</Button>
    </form>
  )
}
export default TaskForm;
