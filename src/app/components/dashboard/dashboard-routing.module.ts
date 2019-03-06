import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfileModule'
      },
      {
        path: 'games',
        loadChildren: '../games/games.module#GamesModule'
      },
      {
        path: 'track',
        loadChildren: '../track/track.module#TrackModule'
      },
      {
        path: 'updates',
        loadChildren: '../updates/updates.module#UpdatesModule'
      },
      {
        path: 'messages',
        loadChildren: '../messages/messages.module#MessagesModule'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/updates'
      }
    ]
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
export class DashboardRoutingModule { }
