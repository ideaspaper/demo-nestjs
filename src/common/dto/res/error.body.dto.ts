import { HttpStatus } from '@nestjs/common';

export class ErrorBody {
  message: string;
  error: string;
  statusCode: HttpStatus;
}
