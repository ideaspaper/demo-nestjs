import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const startTime = process.hrtime();

    res.on('finish', () => {
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const latency = (seconds * 1000 + nanoseconds / 1_000_000).toFixed(3);

      const logEntry = {
        requestId: req.headers['X-Request-Id'],
        timestamp: new Date().toISOString(),
        ip: req.ip,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        userAgent: req.headers['user-agent'] || '',
        referer: req.headers['referer'] || '',
        contentLength: res.getHeader('Content-Length') || 0,
        latencyMs: latency,
      };

      this.logger.log(JSON.stringify(logEntry));
    });

    next();
  }
}
