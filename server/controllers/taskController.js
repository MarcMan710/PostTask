const {
  getUserTasks,
  createTask: createTaskModel, // Renaming to avoid conflict with handler
  deleteTask: deleteTaskModel, // Renaming to avoid conflict with handler
  updateTask: updateTaskModel, // Renaming to avoid conflict with handler
  getTask, // Assuming getTask is exported by taskModel for fetching single task
} = require('../models/taskModel');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await getUserTasks(req.user.id)
    res.status(200).json(tasks)
  } catch (err) {
    next(err)
  }
}


const createTaskHandler = async (req, res, next) => {
  const { title, description, dueDate, priority } = req.body

  try {
    // Validation is handled by middleware.
    const taskData = {
      title,
      description,
      dueDate,
      priority,
      userId: req.user.id,
    };
    const task = await createTaskModel(taskData);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

const updateTaskHandler = async (req, res, next) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const { title, description, dueDate, priority, status } = req.body;

  try {
    // Validation is handled by middleware.
    const updateData = { title, description, dueDate, priority, status };
    // updateTaskModel is expected to throw an error if task not found or user is not authorized.
    const updatedTask = await updateTaskModel(taskId, userId, updateData);
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
}

const deleteTaskHandler = async (req, res, next) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    // deleteTaskModel is assumed to handle ownership check (e.g., task belongs to user).
    // It's not specified to return a "Task not found" error distinctly from successful deletion
    // if the task never existed or didn't belong to the user. It will throw errors for DB issues.
    await deleteTaskModel(taskId, userId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

// getTask controller (assuming it's used by a route like GET /tasks/:id)
// This was originally exported and should be maintained.
// It uses the getTask function imported from the model.
const getTaskHandler = async (req, res, next) => {
  const taskId = req.params.id;
  const userId = req.user.id; // Assuming tasks are user-specific

  try {
    const task = await getTask(taskId, userId); // Assuming model's getTask takes userId
    if (!task) {
      // Explicitly create an Error instance if task is not found by the model
      return next(new Error('Task not found'));
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks, // For GET /tasks
  getTask: getTaskHandler, // For GET /tasks/:id
  createTask: createTaskHandler, // For POST /tasks
  updateTask: updateTaskHandler, // For PUT /tasks/:id
  deleteTask: deleteTaskHandler, // For DELETE /tasks/:id
};
