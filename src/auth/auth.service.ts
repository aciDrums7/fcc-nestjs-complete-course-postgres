import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/resources/users/users.service';
import { ArtistsService } from 'src/resources/artists/artists.service';
import { IdTokenGrants } from './types/id-token-grants.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly artistsService: ArtistsService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ idToken: string }> {
    const user = await this.usersService.findOne(loginDTO);
    const isPasswordMatching = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Password does not match');
    }
    const idGrants: IdTokenGrants = { email: user.email, sub: user.id };
    const artist = await this.artistsService.findOneByUserId(user.id);
    if (artist) {
      idGrants.artistId = artist.id;
    }
    return { idToken: this.jwtService.sign(idGrants) };
  }
}
