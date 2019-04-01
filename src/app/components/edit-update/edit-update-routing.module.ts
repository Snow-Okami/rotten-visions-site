import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUpdateComponent } from './edit-update.component';

const routes: Routes = [
  {
    path: '',
    component: EditUpdateComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/updates/edit/:id'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUpdateRoutingModule { }
