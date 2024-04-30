import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// ! Strategy must be imported from the correct strategy module!
import { Strategy } from 'passport-http-bearer';
import { User } from 'src/resources/users/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  //? When you will apply the AuthGuard @UseGuards(AuthGuard('bearer')) to the protected route. It
  //? will call the validate method from the ApiKeyStrategy
  async validate(apiKey: string): Promise<User> {
    const user = await this.authService.validateUserByApiKey(apiKey);
    if (!user) {
      throw new UnauthorizedException('Invalid API key');
    }
    return user;
  }
}
