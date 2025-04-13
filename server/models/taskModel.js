// models/taskModel.js
import pool from '../db/index.js';

export const getTasksByUserId = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY due_date ASC',
    [userId]
  );
  return result.rows;
};

export const getTaskById = async (taskId, userId) => {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
    [taskId, userId]
  );
  return result.rows[0];
};

export const createTask = async (userId, title, description, dueDate, priority) => {
  const result = await pool.query(
    `INSERT INTO tasks (user_id, title, description, due_date, priority) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, title, description, dueDate, priority]
  );
  return result.rows[0];
};

export const updateTask = async (taskId, userId, updates) => {
  const { title, description, due_date, priority, completed } = updates;

  const result = await pool.query(
    `UPDATE tasks SET 
      title = $1,
      description = $2,
      due_date = $3,
      priority = $4,
      completed = $5
     WHERE id = $6 AND user_id = $7 RETURNING *`,
    [title, description, due_date, priority, completed, taskId, userId]
  );
  return result.rows[0];
};

export const deleteTask = async (taskId, userId) => {
  await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
};
