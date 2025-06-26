import { RepositoryException } from './exception.repository';

export class TodoNotFoundRepositoryException extends RepositoryException {
  constructor(message: string = 'todo not found') {
    super(message);
    this.name = TodoNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
