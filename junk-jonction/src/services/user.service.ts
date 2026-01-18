import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiAuthResponse, AuthPayload } from '../models/types/ApiAuthResponse';
import { Store } from '@ngxs/store';
import { SetUser, UnsetUser } from '../actions/user-actions';
import { Router } from '@angular/router';
import { AuthenticatedUser } from '../models/types/AuthenticatedUser';
import { USER_KEY } from '../state/user-state';
import { LoadMeError, LoadMeSuccess, SetToken, UnsetToken } from '../actions/token-actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL: string = environment.apiURL;
  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
  ) {}

  signup(userSignupData: UserSignupData): Observable<AuthPayload> {
    return this.http
      .post<ApiAuthResponse>(`${this.apiURL}/users/signup`, userSignupData, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          this.store.dispatch(new SetUser(response.data.user));
          this.store.dispatch(new SetToken(response.data.token));
          this.router.navigate(['/']);
          return response.data;
        }),
      );
  }

  signin(userSigninData: UserSigninData): Observable<AuthPayload> {
    return this.http
      .post<ApiAuthResponse>(`${this.apiURL}/users/signin`, userSigninData, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          this.store.dispatch(new SetUser(response.data.user));
          this.store.dispatch(new SetToken(response.data.token));
          this.router.navigate(['/']);

          return response.data;
        }),
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiURL}/users/logout`, {}, { withCredentials: true }).pipe(
      map(() => {
        this.store.dispatch(new UnsetToken());
        this.store.dispatch(new UnsetUser());

        this.router.navigate(['/']);
      }),
    );
  }

  getCurrentUserFromLocalStorage(): AuthenticatedUser {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as AuthenticatedUser;
    }
    throw new Error('No current user found in local storage');
  }

  getCurrentUser(): Observable<AuthenticatedUser | null> {
    return this.http
      .get<ApiAuthResponse>(`${this.apiURL}/users/me`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.store.dispatch([
            new SetUser(response.data.user),
            new SetToken(response.data.token),
            new LoadMeSuccess(response.data.token),
          ]);
        }),
        map((response) => response.data.user),
        catchError(() => {
          this.store.dispatch([new UnsetUser(), new UnsetToken(), new LoadMeError()]);
          return of(null);
        }),
      );
  }
}
