const db = require('../config/db')
const formatError = require('../utils/formatError');

// Get tasks for a user
async function getUserTasks(userId) {
  const query = `
    SELECT * 
    FROM tasks 
    WHERE user_id = $1 
    ORDER BY created_at DESC
  `;
  try {
    const { rows } = await db.query(query, [userId]);
    return rows;
  } catch (error) {
    const formattedError = formatError(error);
    throw new Error(`Error getting user tasks: ${formattedError.message}`);
  }
}

// Create a new task
async function createTask(task) {
  const { title, description, dueDate, priority = 'Medium', userId } = task
  const query = `
    INSERT INTO tasks (title, description, due_date, priority, user_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`
  const values = [title, description, dueDate, priority, userId]
  try {

    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    const formattedError = formatError(error);
    throw new Error(`Error creating task: ${formattedError.message}`);
  }
}

// Update task
async function updateTask(taskId, userId, updates) {
  const { title, description, dueDate, priority, status, category } = updates;
  const query = `
  UPDATE tasks 
  SET title = $1, description = $2, due_date = $3, priority = $4, status = $5, category = $6
  WHERE id = $7 AND user_id = $8
  RETURNING *
  `;


  const values = [title, description, dueDate, priority, status, category, taskId, userId];
  try {
    const { rows } = await db.query(query, values);
    if (rows.length === 0) throw new Error('Task not found or user does not have permission to update this task');
    return rows[0];
  } catch (error) {
    const formattedError = formatError(error);
    throw new Error(`Error updating task: ${formattedError.message}`);
  }
}

// Delete task
async function deleteTask(taskId) {
  const query = `DELETE FROM tasks WHERE id = $1 RETURNING *`;
  try {
    await db.query(query, [taskId]);
  } catch (error) {
    const formattedError = formatError(error);
    throw new Error(`Error deleting task: ${formattedError.message}`);
  }
}

module.exports = {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask
};
