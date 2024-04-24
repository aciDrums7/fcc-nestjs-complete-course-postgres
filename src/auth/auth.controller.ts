import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/resources/users/users.service';
import { CreateUserDTO } from 'src/resources/users/dto/create-user.dto';
import { User } from 'src/resources/users/user.entity';

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
}
