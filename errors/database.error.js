const  BaseError = require('./base.error');

class DatabaseError extends BaseError {
  constructor(
    message = 'Database Error',
    statusCode,
    isOperational
  ) {
    super('DatabaseError', statusCode, isOperational, message);
    
  }
}
module.exports = DatabaseError