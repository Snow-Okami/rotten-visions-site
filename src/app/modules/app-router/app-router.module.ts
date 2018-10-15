import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthguardService } from '../../services/authguard.service';

const routes : Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [ AuthguardService ],
    loadChildren: '../landing/landing.module#LandingModule'
  },
  {
    path: 'app',
    pathMatch: 'full',
    canActivate: [ AuthguardService ],
    loadChildren: '../main/main.module#MainModule'
  },
  {
    path: 'login',
    pathMatch: 'full',
    canActivate: [ AuthguardService ],
    loadChildren: '../login/login.module#LoginModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: '../notfound/notfound.module#NotfoundModule'
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRouterModule { }
