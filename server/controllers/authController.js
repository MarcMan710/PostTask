const { hashPassword, comparePassword } = require('../utils/hashPassword')
const generateToken = require('../utils/generateToken')
// const validateEmail = require('../utils/validateEmail'); // Removed as per subtask
const { createUser, findUserByEmail } = require('../models/userModel')

const registerUser = async (req, res, next) => {
  const { email, password } = req.body

  // Input validation (e.g., email format, password presence)
  // is now handled by the 'validateRegister' middleware.
  try {
    // The 'validateRegister' middleware (checking email format, password length)
    // would have already run and sent a 400 response if validation failed.
    // Thus, manual checks for email format or presence are removed.

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const hashedPassword = await hashPassword(password)
    const user = await createUser(email, hashedPassword)

    const token = generateToken(user.id)
    res.status(201).json({ id: user.id, email: user.email, token })
  } catch (err) {
    next(err)
  }
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await findUserByEmail(email)

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user.id)
    res.status(200).json({ id: user.id, email: user.email, token })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  registerUser,
  loginUser,
}
