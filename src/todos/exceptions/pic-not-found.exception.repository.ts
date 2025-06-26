import { RepositoryException } from './exception.repository';

export class PicNotFoundRepositoryException extends RepositoryException {
  constructor(message: string = 'pic not found') {
    super(message);
    this.name = PicNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
