import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IdToken } from '../types/id-token.type';
import { RequestUser } from '../types/request-user.type';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  // ? this function will be called by the @AuthGuard('jwt')
  // ? and it will add the userId and email to the `req.user` object
  async validate(payload: IdToken): Promise<RequestUser> {
    // Logger.log(`JWT: \n${JSON.stringify(payload, null, 2)}`);
    return {
      id: payload.sub,
      email: payload.email,
      artistId: payload.artistId,
    };
  }
}
