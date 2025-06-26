import { RepositoryException } from './exception.repository';

export class TagNotFoundRepositoryException extends RepositoryException {
  constructor(message: string = 'tag not found') {
    super(message);
    this.name = TagNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
