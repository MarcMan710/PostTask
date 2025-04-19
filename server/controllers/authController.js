const { hashPassword, comparePassword } = require('../utils/hashPassword')
const generateToken = require('../utils/generateToken')
const validateEmail = require('../utils/validateEmail')
const { createUser, findUserByEmail } = require('../models/userModel')

const registerUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

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
