import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/resources/users/users.service';
import { ArtistsService } from 'src/resources/artists/artists.service';
import { IdTokenGrants } from './types/id-token-grants.type';
import { Enable2FA } from './types/enable-2fa.type';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';
import { User } from 'src/resources/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly artistsService: ArtistsService
  ) {}

  async login(
    loginDTO: LoginDTO
  ): Promise<{ idToken: string } | { validate2FA: string; message: string }> {
    const user = await this.usersService.findOne(loginDTO);
    const isPasswordMatching = await bcrypt.compare(
      loginDTO.password,
      user.password
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Password does not match');
    }
    const idGrants: IdTokenGrants = { email: user.email, sub: user.id };
    const artist = await this.artistsService.findOneByUserId(user.id);
    if (artist) {
      idGrants.artistId = artist.id;
    }
    if (user.enable2FA && user.secret2FA) {
      return {
        validate2FA: 'http://localhost:3000/auth/validate-2fa',
        message: 'Please send the OTP from your Authenticator App',
      };
    }
    return { idToken: this.jwtService.sign(idGrants) };
  }

  async enable2FA(userId: number): Promise<Enable2FA> {
    const user = await this.usersService.findOneById(userId);
    if (user.enable2FA) {
      return { secret: user.secret2FA };
    }
    const secret = speakeasy.generateSecret();
    user.secret2FA = secret.base32;
    await this.usersService.updateSecretKey(user.id, user.secret2FA);
    return { secret: user.secret2FA };
  }

  async validateOtp(
    userId: number,
    otp: string
  ): Promise<{ verified: boolean }> {
    const user = await this.usersService.findOneById(userId);
    try {
      const verified = speakeasy.totp.verify({
        secret: user.secret2FA,
        encoding: 'base32',
        token: otp,
      });
      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (error) {
      throw new UnauthorizedException('OTP is not valid');
    }
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.usersService.disable2FA(userId);
  }

  validateUserByApiKey(apiKey: string): Promise<User> {
    return this.usersService.findOneByApiKey(apiKey);
  }
}
