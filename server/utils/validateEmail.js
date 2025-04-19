/**
 * Validates an email address.
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 * @throws {Error} - Throws an error if the email is not a string or is empty.
 */
const validateEmail = (email) => {
  if (typeof email !== 'string' || email.trim() === '') {
    throw new Error('Email must be a non-empty string.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
  if (!emailRegex.test(email.toLowerCase())) {
    throw new Error('Invalid email format.');
  }
  return true;
};

module.exports = validateEmail;
