import { State, Selector, StateContext, Action } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthStateModel } from '../models/state/auth-state-model';
import { AuthAction } from '../actions/auth-actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: {
      connexion: false,
    },
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static isConnected(state: AuthStateModel): boolean {
    return state.auth.connexion;
  }

  @Action(AuthAction)
  connexion({ patchState }: StateContext<AuthStateModel>, { payload }: AuthAction) {
    patchState({
      auth: payload,
    });
  }
}
