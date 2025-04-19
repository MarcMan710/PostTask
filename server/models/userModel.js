const db = require('../config/db');
const formatError = require('../utils/formatError');

// Register a new user
async function createUser(email, hashedPassword) {
  const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`;
  const values = [email, hashedPassword];
  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    const formattedError = formatError(error);
    throw new Error(`Error creating user: ${formattedError.message}`);
  }
}

// Find user by email
async function findUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = $1`;
  try {
    const { rows } = await db.query(query, [email]);
    return rows[0];
  } catch (error) {
    const formattedError = formatError(error);
    throw new Error(`Error finding user: ${formattedError.message}`);
  }
}

module.exports = { createUser, findUserByEmail };
