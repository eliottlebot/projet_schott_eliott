export class SetFavorite {
  static readonly type = '[Favorite] Set';
  constructor(public id: number) {}
}

export class UnsetFavorite {
  static readonly type = '[Favorite] Unset';
  constructor(public id: number) {}
}

export class ClearFavorites {
  static readonly type = '[Favorite] Clear All';
}

export class GetFavoritesCount {
  static readonly type = '[Favorite] Get Favorites Count';
}
