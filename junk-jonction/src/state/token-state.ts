import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetToken, UnsetToken } from '../actions/token-actions';
import { TokenStateModel } from '../models/state/token-state-model';

const TOKEN_KEY = 'token';

@State<TokenStateModel>({
  name: 'token',
  defaults: {
    token: localStorage.getItem(TOKEN_KEY),
  },
})
@Injectable()
export class TokenState {
  @Action(SetToken)
  setToken(ctx: StateContext<TokenStateModel>, action: SetToken) {
    ctx.patchState({ token: action.token });
    localStorage.setItem(TOKEN_KEY, action.token);
  }

  @Action(UnsetToken)
  unsetToken(ctx: StateContext<TokenStateModel>) {
    ctx.patchState({ token: null });
    localStorage.removeItem(TOKEN_KEY);
  }

  @Selector()
  static token(state: TokenStateModel) {
    return state.token;
  }
}
