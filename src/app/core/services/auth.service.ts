import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {Store} from '@ngrx/store';
import {Delete} from '../../store/actions/profile';

import {urlConfig} from '../../config';
import {Login} from '../../models';
import {TokenService} from './token.service';

const options = {
  headers: new HttpHeaders({'content-type': 'application/json'}),
  observe: 'response',
  withCredentials: true,
  params: null
};

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<null>
  ) {}

  public login(loginObj: Login) {
    return this.http.post(urlConfig.login, loginObj, options as object)
      .pipe(
        map(resp => this.loginHelper(resp)),
        catchError(err => this.handleLoginError(err))
      );
  }
  public forgotPassword(login: string): Observable<string> {
    return this.http.get<HttpResponse<string>>(urlConfig.forgot + login, options as object)
      .pipe(
        map(resp => resp.body),
        catchError(err => this.handleForgotError(err))
      );
  }
  public logout(): void {
    TokenService.deleteToken();
    this.store.dispatch(new Delete());
    this.router.navigate(['/login']);
  }

  private handleLoginError(error: HttpErrorResponse) {
    return throwError(error.status === 401 ? 'ERROR.LOGIN' : 'ERROR.BASE');
  }
  private handleForgotError(error: HttpErrorResponse) {
    return throwError(error.status === 404 ? 'ERROR.FORGOT' : 'ERROR.BASE');
  }
  private loginHelper(resp): void {
    this.router.navigate(['/']);
  }
}
