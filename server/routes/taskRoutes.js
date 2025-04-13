// routes/taskRoutes.js
import express from 'express';
import {
  getTasks,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from '../controllers/taskController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);  // All routes below require authentication

router.get('/', getTasks);                           // GET /api/tasks
router.post('/', createTaskHandler);                 // POST /api/tasks
router.put('/:id', updateTaskHandler);               // PUT /api/tasks/:id
router.delete('/:id', deleteTaskHandler);            // DELETE /api/tasks/:id

export default router;
