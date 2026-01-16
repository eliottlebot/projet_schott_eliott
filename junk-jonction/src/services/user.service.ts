import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiAuthResponse, AuthPayload } from '../models/types/ApiAuthResponse';
import { Store } from '@ngxs/store';
import { SetUser } from '../actions/user-actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL: string = environment.apiURL;
  constructor(private http: HttpClient, private store: Store, private router: Router) {}

  signup(userSignupData: UserSignupData): Observable<AuthPayload> {
    return this.http.post<ApiAuthResponse>(`${this.apiURL}/users/signup`, userSignupData).pipe(
      map((response) => {
        this.store.dispatch(new SetUser(response.data.user));
        this.router.navigate(['/']);
        return response.data;
      })
    );
  }

  signin(userSigninData: UserSigninData): Observable<AuthPayload> {
    return this.http.post<ApiAuthResponse>(`${this.apiURL}/users/signin`, userSigninData).pipe(
      map((response) => {
        this.store.dispatch(new SetUser(response.data.user));
        this.router.navigate(['/']);
        return response.data;
      })
    );
  }
}
