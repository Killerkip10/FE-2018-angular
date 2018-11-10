import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {first} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';
import {State as ProfileState, getProfileJsState} from '../../store/reducers/profile';
import {State as UsersState, getUsersJsState} from '../../store/reducers/users';
import {EditProfile} from '../../store/actions/profile';
import {EditUser, CreateUser} from '../../store/actions/users';
import {State} from '../../store/reducers';

import {User} from '../../models';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  public tabs = ['USER-PROFILE.TABS.PROFILE', 'USER-PROFILE.TABS.EDIT'];
  public tabIndex = 0;
  public profile$: Observable<ProfileState>;
  public users$: Observable<UsersState>;

  constructor(
    private store: Store<State>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profile$ = this.store.pipe(select(getProfileJsState));
    this.users$ = this.store.pipe(select(getUsersJsState));

    this.profile$
      .pipe(first(state => state.loaded))
      .subscribe(state => {
        if (state.profile.role === '2') {
          this.tabs.push('USER-PROFILE.TABS.USERS', 'USER-PROFILE.TABS.CREATE-USER');
        }
      });
  }

  public selectTab(changeTab): void {
    this.tabIndex = changeTab.index;
  }
  public onEditProfile(user: User): void {
    this.store.dispatch(new EditProfile(user));
    this.snackBar.open('Updated', 'Profile', {duration: 3000});
  }
  public onEditUser(user: User): void {
    this.store.dispatch(new EditUser(user));
    this.snackBar.open('Updated', 'User', {duration: 3000});
  }
  public onCreateUser(user: User): void {
    this.store.dispatch(new CreateUser(user));
    this.snackBar.open('Create', 'User', {duration: 3000});
  }
}
