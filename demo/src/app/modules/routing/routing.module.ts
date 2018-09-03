import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  { path: '', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
  { path: 'chat', loadChildren: '../socket/socket.module#SocketModule' }
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
