const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generates a JWT token.
 * @param {object} payload - The payload to be included in the token.
 * @param {string} [expiresIn='7d'] - The expiration time of the token.
 * @returns {string} - The generated JWT token.
 * @throws {Error} - Throws an error if token generation fails.
 */
const generateToken = (payload, expiresIn = '7d') => {  
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    });
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw new Error(`Failed to generate token: ${error.message}`);
  }
};

module.exports = {
  generateToken,
};
