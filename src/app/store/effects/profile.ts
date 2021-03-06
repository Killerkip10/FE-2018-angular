import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  GET_PROFILE,
  EDIT,
  EditProfile,
  Success,
  Error
} from '../actions/profile';

import {User} from '../../../../server/models';
import {urlConfig} from '../../config';

const options = {
  headers: new HttpHeaders({'content-type': 'application/json'}),
  observe: 'response',
  withCredentials: true,
  params: null
};

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  @Effect()
  loadProfile$ = this.actions$
    .pipe(
      ofType(GET_PROFILE),
      mergeMap(() => this.http.get<HttpResponse<User>>(urlConfig.getProfile, options as object)
        .pipe(
          map(resp => new Success(resp.body)),
          catchError(() => of(new Error('ERROR.BASE')))
        )
      )
    );

  @Effect()
  editProfile$ = this.actions$
    .pipe(
      ofType(EDIT),
      mergeMap((action: EditProfile) => this.http.put<HttpResponse<User>>(urlConfig.editProfile, action.profile, options as object)
        .pipe(
          map(resp => new Success(resp.body)),
          catchError(() => of(new Error('ERROR.BASE')))
        )
      )
    );
}
