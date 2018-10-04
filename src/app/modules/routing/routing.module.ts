import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../../services/authguard.service';

const routes : Routes = [
  {
    path: '',
    canActivate: [ AuthGuardService ],
    loadChildren: '../dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'common',
    canActivate: [ AuthGuardService ],
    loadChildren: '../login/login.module#LoginModule'
  },
  {
    path: '**',
    loadChildren: '../demo/demo.module#DemoModule'
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
