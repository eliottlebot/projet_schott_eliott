import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { GetFavoritesCount, SetFavorite, UnsetFavorite } from '../actions/favorites-actions';

export interface FavoriteStateModel {
  favorites: number[];
}

@State<FavoriteStateModel>({
  name: 'favorites',
  defaults: {
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  },
})
@Injectable()
export class FavoriteState {
  @Selector()
  static favorites(state: FavoriteStateModel): number[] {
    return state.favorites;
  }

  @Selector()
  static favoritesCount(state: FavoriteStateModel): number {
    return state.favorites.length;
  }

  @Action(SetFavorite)
  setFavorite(ctx: StateContext<FavoriteStateModel>, action: SetFavorite) {
    const state = ctx.getState();
    if (!state.favorites.includes(action.id)) {
      const updated = [...state.favorites, action.id];
      ctx.patchState({ favorites: updated });
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  }

  @Action(UnsetFavorite)
  unsetFavorite(ctx: StateContext<FavoriteStateModel>, action: UnsetFavorite) {
    const state = ctx.getState();
    const updated = state.favorites.filter((fav) => fav !== action.id);
    ctx.patchState({ favorites: updated });
    localStorage.setItem('favorites', JSON.stringify(updated));
  }
}
