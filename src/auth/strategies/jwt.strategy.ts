import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(
        'JWT_SECRET',
        '9f8d2e207e45a8deadb4cff8e',
      ),
    });
  }

  // ? this function will be called by the @AuthGuard('jwt')
  // ? and it will add the userId and email to the `req.user` object
  async validate(payload: any) {
    // Logger.log(`JWT: \n${JSON.stringify(payload, null, 2)}`);
    return { userId: payload.sub, email: payload.email };
  }
}
