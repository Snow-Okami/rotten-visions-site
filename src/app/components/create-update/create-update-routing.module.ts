import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUpdateComponent } from './create-update.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUpdateComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/updates/create'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUpdateRoutingModule { }
