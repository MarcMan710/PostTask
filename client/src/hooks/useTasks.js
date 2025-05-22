import { useEffect, useState } from 'react'
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskService'

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      // setError(null) is called at the beginning of the effect's async function
      setLoading(true);
      setError(null); // Explicitly clear error before new load attempt
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err);
    }
  };

  const editTask = async (id, updates) => {
    try {
      const updated = await updateTask(id, updates);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (err) {
      setError(err);
    }
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    loading,
    addTask,
    editTask,
    removeTask,
    error,
  };
};

export default useTasks;
