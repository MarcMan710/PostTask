import TaskBoard from './TaskBoard'
import TaskFormModal from './TaskFormModal'
import { useState } from 'react'
import Button from '../../components/common/Button'

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <Button onClick={handleOpenModal}>Add Task</Button>
      </div>
      <TaskBoard onEdit={setSelectedTask} />
      <TaskFormModal task={selectedTask} setTask={setSelectedTask} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
}

export default Dashboard
