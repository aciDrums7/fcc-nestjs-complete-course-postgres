import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userService.create(createUserDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST, {
        cause: e,
      });
    }
  }
}
