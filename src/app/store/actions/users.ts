import {Action} from '@ngrx/store';

import {User} from '../../models';

export const GET_USERS = '[Users] Get users';
export const FIND_USERS = '[Users] Find users';
export const SELECT_USER = '[Users] Select user';
export const EDIT_USER = '[Users] Edit user';
export const CREATE_USER = '[Users] Create user';
export const CREATE_SUCCESS = '[Users] Success create';
export const EDIT_SUCCESS = '[Users] Success edit';
export const SUCCESS = '[Users] Success';
export const ERROR = '[Users] Error';

export class GetUsers implements Action {
  public readonly type = GET_USERS;
}
export class FindUsers implements Action {
  public readonly type = FIND_USERS;

  constructor(public name: string) {}
}
export class SelectUser implements Action {
  public readonly type = SELECT_USER;

  constructor(public user: User) {}
}
export class EditUser implements Action {
  public readonly type = EDIT_USER;

  constructor(public user: User) {}
}
export class CreateUser implements Action {
  public readonly type = CREATE_USER;

  constructor(public user: User) {}
}
export class CreateSuccess implements Action {
  public readonly type = CREATE_SUCCESS;

  constructor(public user: User) {}
}
export class EditSuccess implements Action {
  readonly type = EDIT_SUCCESS;

  constructor(public user: User) {}
}
export class Success implements Action {
  readonly type = SUCCESS;

  constructor(public users: User[]) {}
}
export class Error implements Action {
  readonly type = ERROR;

  constructor(public err: string) {}
}

export type Action = GetUsers
  | FindUsers
  | SelectUser
  | EditUser
  | CreateUser
  | CreateSuccess
  | EditSuccess
  | Success
  | Error;
