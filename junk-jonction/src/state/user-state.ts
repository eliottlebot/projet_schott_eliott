import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserStateModel } from '../models/state/user-state-model';
import { SetUser, UnsetUser } from '../actions/user-actions';

const USER_KEY = 'user';

function getStoredUser(): UserStateModel['user'] {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: getStoredUser(),
  },
})
@Injectable()
export class UserState {
  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, action: SetUser) {
    ctx.patchState({ user: action.user });
    localStorage.setItem(USER_KEY, JSON.stringify(action.user));
  }

  @Action(UnsetUser)
  unsetUser(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ user: null });
    localStorage.removeItem(USER_KEY);
  }

  @Selector()
  static user(state: UserStateModel) {
    return state.user;
  }
}
