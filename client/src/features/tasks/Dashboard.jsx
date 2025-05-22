import TaskBoard from './TaskBoard'
import TaskFormModal from './TaskFormModal'
import { useState, useEffect } from 'react'
import Button from '../../components/common/Button'
import { useTasks } from '../../hooks/useTasks'

const sortedTasks = (tasks) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return [...tasks].sort((a, b) => order[a.priority] - order[b.priority]);
  };
  
const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { tasks } = useTasks(); // Removed fetchTasks, as useTasks handles initial fetch
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Removed redundant useEffect hooks calling fetchTasks.
  // useTasks hook handles the initial data fetching.

  const categories = Array.from(new Set(tasks.map(task => task.category).filter(Boolean)));

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const filteredTasks = selectedCategory
    ? tasks.filter(task => task.category === selectedCategory)
    : tasks;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <Button onClick={handleOpenModal}>Add Task</Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-sm px-3 py-1 rounded ${selectedCategory === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
        <button onClick={() => setSelectedCategory(null)} className="text-sm px-3 py-1 bg-gray-300 rounded">All</button>
      </div>

      <TaskBoard onEdit={setSelectedTask} tasks={sortedTasks(filteredTasks)} />
      <TaskFormModal task={selectedTask} setTask={setSelectedTask} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
}

export default Dashboard

  
