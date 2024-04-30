import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { PassportRequest } from './auth/dto/request-with.user.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';

@Controller('/')
//* https://docs.nestjs.com/openapi/decorators
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@Req() req: PassportRequest) {
    return req.user.id;
  }
}
