import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadMeError, LoadMeSuccess, SetToken, UnsetToken } from '../actions/token-actions';
import { TokenStateModel } from '../models/state/token-state-model';

@State<TokenStateModel>({
  name: 'token',
  defaults: {
    token: null,
    loaded: false,
  },
})
@Injectable()
export class TokenState {
  @Action(SetToken)
  setToken(ctx: StateContext<TokenStateModel>, action: SetToken) {
    ctx.patchState({ token: action.token });
  }

  @Action(UnsetToken)
  unsetToken(ctx: StateContext<TokenStateModel>) {
    ctx.patchState({ token: null });
  }

  @Selector()
  static token(state: TokenStateModel) {
    return state.token;
  }

  @Selector()
  static loaded(state: TokenStateModel) {
    return state.loaded;
  }

  @Action(LoadMeSuccess)
  loadMeSuccess(ctx: StateContext<TokenStateModel>, action: LoadMeSuccess) {
    ctx.patchState({
      token: action.token,
      loaded: true,
    });
  }

  @Action(LoadMeError)
  loadMeError(ctx: StateContext<TokenStateModel>) {
    ctx.patchState({
      token: null,
      loaded: true,
    });
  }
}
