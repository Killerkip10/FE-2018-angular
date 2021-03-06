import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user-profile',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/user-profile'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRouting {}
