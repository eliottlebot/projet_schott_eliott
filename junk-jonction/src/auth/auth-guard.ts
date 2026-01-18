import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TokenState } from '../state/token-state';
import { filter, map, Observable, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(TokenState.loaded).pipe(
      filter((loaded) => loaded),
      take(1),
      switchMap(() => this.store.select(TokenState.token).pipe(take(1))),
      map((token) => {
        if (token) {
          return true;
        }
        this.router.navigate(['/user/signup']);
        return false;
      }),
    );
  }
}
