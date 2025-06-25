export class TodoNotFoundRepositoryException extends Error {
  constructor(message: string = 'todo not found') {
    super(message);
    this.name = TodoNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
