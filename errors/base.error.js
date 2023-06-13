class BaseError extends Error {
  constructor(
    name = '',
    statusCode,
    isOperational,
    message = '',
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
module.exports = BaseError