// controllers/taskController.js
import {
  getTasksByUserId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../models/taskModel.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUserId(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

export const createTaskHandler = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const task = await createTask(req.user.id, title, description, dueDate, priority);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

export const updateTaskHandler = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedTask = await updateTask(id, req.user.id, updates);
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

export const deleteTaskHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTask(id, req.user.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};
