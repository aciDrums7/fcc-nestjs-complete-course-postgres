import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const now = new Date();
    Logger.log(
      `${now.toDateString()}, ${now.toLocaleTimeString()} - Request ${req.method} ${req.path}`,
    );
    if (Object.keys(req.body).length !== 0) {
      Logger.log(`Body: \n${JSON.stringify(req.body, null, 2)}`);
    }
    next();
  }
}
