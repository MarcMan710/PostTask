const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  getTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask,
} = require('../controllers/taskController');

// Protect all routes in this file
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTask);
router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router
