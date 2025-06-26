import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RepositoryException } from '../../todos/exceptions/exception.repository';
import { PicNotFoundRepositoryException } from '../../todos/exceptions/pic-not-found.exception.repository';
import { TagNotFoundRepositoryException } from '../../todos/exceptions/tag-not-found.exception.repository';
import { TodoNotFoundRepositoryException } from '../../todos/exceptions/todo-not-found.exception.repository';
import { ErrorBody } from '../dto/res/error.body.dto';

@Catch(RepositoryException)
export class RepositoryExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: RepositoryException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let responseBody: ErrorBody = {
      message: 'something wrong on our side',
      error: 'internal server error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof TodoNotFoundRepositoryException) {
      responseBody = {
        message: exception.message,
        error: exception.name,
        statusCode: HttpStatus.NOT_FOUND,
      };
    } else if (exception instanceof TagNotFoundRepositoryException) {
      responseBody = {
        message: exception.message,
        error: exception.name,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    } else if (exception instanceof PicNotFoundRepositoryException) {
      responseBody = {
        message: exception.message,
        error: exception.name,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

    httpAdapter.reply(res, responseBody, responseBody.statusCode);
  }
}
