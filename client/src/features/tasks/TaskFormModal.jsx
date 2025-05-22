import TaskForm from "../../components/tasks/TaskForm";
import Modal from "../../components/common/Modal";
import { useTasks } from "../../hooks/useTasks";
import { useEffect } from "react";

const TaskFormModal = ({ task, setTask, isOpen, setIsOpen }) => {
  // Access error state from useTasks
  const { addTask, editTask, error: tasksError } = useTasks();

  // Clear task selection when modal closes or initial task changes
  useEffect(() => {
    if (!isOpen) {
      setTask(null);
    }
  }, [isOpen, setTask]);

  const handleSubmit = async (formData) => {
    let success = false;
    if (task) { // Editing existing task
      await editTask(task.id, formData);
    } else { // Adding new task
      await addTask(formData);
    }
    
    // After await, tasksError from useTasks() should be updated if an error occurred.
    // The component should re-render with the new tasksError value.
    // We check this tasksError to decide whether to close the modal.
    // Note: This relies on tasksError being promptly updated and the component re-rendering.
    // A more robust solution might involve addTask/editTask returning success status.
    if (!tasksError) {
      setTask(null); // Clear selected task for next time
      setIsOpen(false); // Close modal only if there was no error
      success = true; 
    }
    // If tasksError is set, the modal remains open and displays the error.
    return success; // Mainly for potential future use, not strictly needed now
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        // setTask(null); // Moved to useEffect to handle task clearing more reliably
      }}
    >
      {/* Display error message from useTasks hook */}
      {tasksError && (
        <div className="p-2 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          <p>Error: {tasksError.message || 'An unexpected error occurred.'}</p>
        </div>
      )}
      <TaskForm
        onSubmit={handleSubmit}
        initialData={task}
        isEditing={!!task}
      />
    </Modal>
  );
};

export default TaskFormModal;
