import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes : Routes = [
  { path: '', component: DashboardComponent },
  { path: 'chat', loadChildren: './socket-module/socket-module.module#SocketModuleModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
