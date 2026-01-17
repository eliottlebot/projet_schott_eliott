import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TokenState } from '../state/token-state';
import { UnsetToken } from '../actions/token-actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(TokenState.token).pipe(
      take(1),
      switchMap((token) => this.handleRequest(req, next, token))
    );
  }

  handleRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    token: string | null
  ): Observable<HttpEvent<any>> {
    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.store.dispatch(new UnsetToken());
          this.router.navigate(['/']);
        }

        return throwError(() => error);
      })
    );
  }
}
