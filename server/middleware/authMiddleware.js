// middleware/authMiddleware.js
import { verifyToken } from '../utils/jwt.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded; // { id, username } — or whatever you encoded
  next();
};
