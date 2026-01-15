export class SetToken {
  static readonly type = '[Token] Set';
  constructor(public token: string) {}
}
export class UnsetToken {
  static readonly type = '[Token] Unset';
  constructor() {}
}
