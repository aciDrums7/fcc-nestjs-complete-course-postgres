import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const now = new Date();
    console.log(
      `${now.toDateString()}, ${now.toLocaleTimeString()} - Request ${req.method} ${req.path}`,
    );
    if (req.body) {
      console.log(`Body: \n${JSON.stringify(req.body, null, 2)}`);
    }
    next();
  }
}
