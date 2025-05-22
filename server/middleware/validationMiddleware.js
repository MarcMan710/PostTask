const { body, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User validation rules
const validateRegister = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  handleValidationErrors,
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

// Task validation rules
const createTaskValidation = [
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('dueDate').optional().isISO8601().toDate().withMessage('DueDate must be a valid date'),
  body('priority').optional().isString().withMessage('Priority must be a string (e.g., Low, Medium, High)'),
  handleValidationErrors,
];

const updateTaskValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty if provided').isString().withMessage('Title must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('dueDate').optional().isISO8601().toDate().withMessage('DueDate must be a valid date if provided'),
  body('priority').optional().isString().withMessage('Priority must be a string (e.g., Low, Medium, High)'),
  body('status').optional().isString().withMessage('Status must be a string (e.g., Pending, In Progress, Completed)'),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  createTaskValidation,
  updateTaskValidation,
  handleValidationErrors, // Export if needed separately, though it's used internally here
};
