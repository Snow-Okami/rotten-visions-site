import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesComponent } from './updates.component';

const routes: Routes = [
  {
    path: '',
    component: UpdatesComponent
  },
  {
    path: 'edit/:id',
    loadChildren: '../edit-update/edit-update.module#EditUpdateModule'
  },
  {
    path: 'view/:id',
    loadChildren: '../view-update/view-update.module#ViewUpdateModule'
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
