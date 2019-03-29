import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesComponent } from './updates.component';

const routes: Routes = [
  {
    path: '',
    component: UpdatesComponent
  },
  {
    path: 'view/:id',
    loadChildren: '../view-update/view-update.module#ViewUpdateModule'
  },
  {
    path: 'view-public/:id',
    loadChildren: '../view-public-update/view-public-update.module#ViewPublicUpdateModule'
  },
  {
    path: 'create',
    loadChildren: '../create-update/create-update.module#CreateUpdateModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/updates'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatesRoutingModule { }
