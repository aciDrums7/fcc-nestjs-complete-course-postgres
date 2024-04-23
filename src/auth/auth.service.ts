import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accesToken: string }> {
    const user = await this.usersService.findOne(loginDTO);
    const isPasswordMatching = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Password does not match');
    }
    const payload = { email: user.email, sub: user.id };
    return { accesToken: this.jwtService.sign(payload) };
  }
}
