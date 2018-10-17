import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import {AppRouting} from './app.routing';
import {AppComponent} from './app.component';
import {AuthGuard} from './guards';
import {
  LoginPageModule,
  UserProfileModule
} from './pages';
import {
  RestApiService,
  UserService
} from './services';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,

    LoginPageModule,
    UserProfileModule,

    AppRouting //last!!!
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    RestApiService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
