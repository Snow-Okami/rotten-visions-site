import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPublicUpdateComponent } from './view-public-update.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPublicUpdateComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/updates/view-public/:id'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPublicUpdateRoutingModule { }

