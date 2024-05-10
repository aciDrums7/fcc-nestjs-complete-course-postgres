import { Injectable, Logger, NestMiddleware, Req, Res } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Req() req: any, @Res() res: any, next: () => void) {
    Logger.log(`Request: ${req.method} ${req.baseUrl}`);
    next();
  }
}
