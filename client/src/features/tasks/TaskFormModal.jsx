import TaskForm from "../../components/tasks/TaskForm";
import Modal from "../../components/common/Modal";
import { useTasks } from "../../hooks/useTasks";

const TaskFormModal = ({ task, setTask, isOpen, setIsOpen }) => {
  const { addTask, editTask } = useTasks();

  const handleSubmit = async (formData) => {
    if (task) {
      await editTask(task.id, formData);
    } else {
      await addTask(formData);
    }
    setTask(null);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        setTask(null);
      }}
    >
      <TaskForm
        onSubmit={handleSubmit}
        initialData={task}
        isEditing={!!task}
      />
    </Modal>
  );
};

export default TaskFormModal;
