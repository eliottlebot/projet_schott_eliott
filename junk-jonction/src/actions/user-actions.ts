import { AuthenticatedUser } from '../models/types/AuthenticatedUser';

export class SetUser {
  static readonly type = '[User] Set';
  constructor(public user: AuthenticatedUser) {}
}
export class UnsetUser {
  static readonly type = '[User] Unset';
  constructor() {}
}
