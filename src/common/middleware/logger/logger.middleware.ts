import { Injectable, Logger, NestMiddleware, Req, Res } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Req() req: any, @Res() res: any, next: () => void) {
    const now = new Date();
    Logger.log(
      `${now.toDateString()}, ${now.toLocaleTimeString()} - Request ${req.method} ${req.baseUrl}`
    );
    next();
  }
}
