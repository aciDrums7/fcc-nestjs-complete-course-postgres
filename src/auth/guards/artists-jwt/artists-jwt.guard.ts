import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { RequestUser } from 'src/auth/types/request-user.type';

@Injectable()
export class ArtistsJwtGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = RequestUser>(err: any, user: RequestUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (user.artistId) {
      return user as TUser;
    }
    throw err || new UnauthorizedException();
  }
}
