import { AuthenticatedUser } from './AuthenticatedUser';

export interface AuthPayload {
  user: AuthenticatedUser;
  token: string;
}

export interface ApiAuthResponse {
  success: boolean;
  data: AuthPayload;
}
