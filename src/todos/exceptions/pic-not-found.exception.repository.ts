export class PicNotFoundRepositoryException extends Error {
  constructor(message: string = 'pic not found') {
    super(message);
    this.name = PicNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
