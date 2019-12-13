import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesComponent } from './updates.component';

const routes: Routes = [
  {
    path: '',
    component: UpdatesComponent,
    children: [
      
    ]
  },
  { path: 'view/:id', loadChildren: () => import('../view-update/view-update.module').then(mod => mod.ViewUpdateModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatesRoutingModule { }
