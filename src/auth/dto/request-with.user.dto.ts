import { RequestUser } from '../types/request-user.type';

export interface RequestWithUserDTO extends Request {
  user: RequestUser;
}
