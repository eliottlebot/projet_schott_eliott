export class SetToken {
  static readonly type = '[Token] Set';
  constructor(public token: string) {}
}
export class UnsetToken {
  static readonly type = '[Token] Unset';
  constructor() {}
}

export class LoadMeSuccess {
  static readonly type = '[Token] Load Me Success';
  constructor(public token: string) {}
}

export class LoadMeError {
  static readonly type = '[Token] Load Me Error';
  constructor() {}
}
