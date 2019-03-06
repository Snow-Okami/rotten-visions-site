import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './notfound.component';

const routes: Routes = [
  {
    path: '',
    component: NotfoundComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/**'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotfoundRoutingModule { }
