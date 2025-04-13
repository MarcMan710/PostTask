// controllers/authController.js
import { createUser, findUserByUsername } from '../models/userModel.js';
import { hashPassword, comparePasswords } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashed = await hashPassword(password);
    const user = await createUser(username, hashed);
    const token = generateToken({ id: user.id, username: user.username });

    res.status(201).json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await comparePasswords(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = generateToken({ id: user.id, username: user.username });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
