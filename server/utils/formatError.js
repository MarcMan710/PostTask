/**
 * Formats an error object into a standardized error response.
 * @param {Error} error - The error object to format.
 * @returns {{message: string}} - The formatted error response.
 */
const formatError = (error) => {
  if (!error.code) {
    return {
      message: error.message || 'An unexpected error occurred.',
    };
  }
  switch (error.code) {
    case '23505':
      return { message: 'Duplicate entry.' };
    case '22P02':
      return { message: 'Invalid input syntax.' };
    default:
      return { message: error.message || 'An unexpected database error occurred.' };
    }
};

module.exports = formatError;
