import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games.component';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent
  },
  {
    path: 'view/:id',
    loadChildren: '../view-games/view-games.module#ViewGamesModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/games'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
