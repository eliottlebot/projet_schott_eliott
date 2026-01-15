import { Auth } from '../models/auth';

export class AuthAction {
  static readonly type = '[Auth] connexion';

  constructor(public payload: Auth) {}
}
