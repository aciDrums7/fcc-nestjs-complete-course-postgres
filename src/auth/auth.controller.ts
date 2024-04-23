import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
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
}
