export class TagNotFoundRepositoryException extends Error {
  constructor(message: string = 'tag not found') {
    super(message);
    this.name = TagNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
