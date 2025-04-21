const {
  getUserTasks,
  createTask,
  deleteTask,
  updateTask
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
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const task = await createTask({
      title,
      description,
      dueDate,
      priority,
      userId: req.user.id,
    })

    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

const updateTaskHandler = async (req, res, next) => {
  const taskId = req.params.id
  const { title, description, dueDate, priority, status } = req.body

  try {
    const updatedTask = await updateTask(taskId, req.user.id, {
      title,
      description,
      dueDate,
      priority,
      userId: req.user.id,
      status,
    })

    res.status(200).json(updatedTask)
  } catch (err) {
    next(err)
  }
}

const deleteTaskHandler = async (req, res, next) => {
  const taskId = req.params.id

  try {
    await deleteTask(taskId)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTasks,
  createTask: createTaskHandler,
  updateTask: updateTaskHandler,
  deleteTask: deleteTaskHandler,
}
