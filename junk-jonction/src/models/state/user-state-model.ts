import { AuthenticatedUser } from '../types/AuthenticatedUser';

export interface UserStateModel {
  user: AuthenticatedUser | null;
}
