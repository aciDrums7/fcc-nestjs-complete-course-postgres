import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/resources/users/dto/create-user.dto';
import { User } from 'src/resources/users/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { UpdateResult } from 'typeorm';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RequestWithUserDTO } from './dto/request-with.user.dto';
import { ValidateOtpDTO } from './dto/validate-otp.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Enable2FA } from './types/enable-2fa.type';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/signup')
  signup(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    try {
      return this.userService.create(createUserDTO);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST, {
        cause: e,
      });
    }
  }

  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    try {
      return this.authService.login(loginDTO);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST, {
        cause: e,
      });
    }
  }

  @Post('/enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(@Req() req: RequestWithUserDTO): Promise<Enable2FA> {
    return this.authService.enable2FA(req.user.id);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Req() req: RequestWithUserDTO,
    @Body() validate2FADTO: ValidateOtpDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validateOtp(req.user.id, validate2FADTO.otp);
  }

  @Post('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(@Req() req: RequestWithUserDTO): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.id);
  }
}
