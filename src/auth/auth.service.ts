import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.usersService.findOne(loginDTO);
    const isPasswordMatching = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Password does not match');
    }
    delete user.password;
    return user;
  }
}
