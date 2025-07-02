import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction): void {
    const requestId = randomUUID();
    req.headers['X-Request-Id'] = requestId;
    next();
  }
}
