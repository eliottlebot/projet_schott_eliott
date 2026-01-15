import { inject, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth-state';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthAction } from '../actions/auth-actions';
import { Auth } from '../models/auth';

class CnxAuth implements Auth {
  constructor(public connexion: boolean) {}
}

export class Login {
  private store = inject(Store);

  connexion: Signal<boolean> = toSignal(this.store.select(AuthState.isConnected), {
    initialValue: false,
  });

  login() {
    let auth = new CnxAuth(true);
    this.store.dispatch(new AuthAction(auth));
  }
}
