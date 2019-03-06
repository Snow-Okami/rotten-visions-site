import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUpdateComponent } from './view-update.component';

const routes: Routes = [
  {
    path: '',
    component: ViewUpdateComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/updates/view/:id'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewUpdateRoutingModule { }
