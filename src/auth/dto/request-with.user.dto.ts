import { RequestUser } from '../types/request-user.type';

export interface PassportRequest extends Request {
  user: RequestUser;
}
