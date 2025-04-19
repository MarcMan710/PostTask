const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 * @throws {Error} - Throws an error if password hashing fails.
 */
const hashPassword = async (password) => {
  try {
    if (typeof password !== 'string' || password.trim() === '') {
      throw new Error('Password must be a non-empty string.');
    }
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hash - The hashed password.
 * @returns {Promise<boolean>} - True if the password matches, false otherwise.
 * @throws {Error} - Throws an error if password comparison fails.
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
module.exports = { hashPassword, comparePassword };
