import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewGamesComponent } from './view-games.component';

const routes: Routes = [
  {
    path: '',
    component: ViewGamesComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/games/view/:id'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewGamesRoutingModule { }
