export class RepositoryException extends Error {
  constructor(message: string = 'repository error') {
    super(message);
    this.name = RepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
