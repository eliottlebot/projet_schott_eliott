import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetToken, UnsetToken } from '../actions/token-actions';
import { TokenStateModel } from '../models/state/token-state-model';

@State<TokenStateModel>({
  name: 'token',
  defaults: {
    token: null,
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
}
