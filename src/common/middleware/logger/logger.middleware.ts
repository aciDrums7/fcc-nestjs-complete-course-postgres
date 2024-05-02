import { Injectable, Logger, NestMiddleware, Req, Res } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Req() req: any, @Res() res: any, next: () => void) {
    const now = new Date();
    Logger.log(
      `${now.toDateString()}, ${now.toLocaleTimeString()} - Request ${req.method} ${req.baseUrl}`
    );
    // if (Object.keys(req.body).length !== 0) {
    //   Logger.log(`Body: \n${JSON.stringify(req.body, null, 2)}`);
    // }
    next();
  }
}
