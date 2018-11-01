import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

/**
 * @description SharedModule contains the shared Components throughout Psynapsus.
 */
import { SharedModule } from '../shared/shared.module';
import { TrimwordPipe } from '../../pipes/trimword.pipe';
import 'hammerjs';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: '/dashboard/games', pathMatch: 'full' },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfileModule' },
      { path: 'games', loadChildren: '../games/games.module#GamesModule' },
      { path: 'updates', loadChildren: '../updates/updates.module#UpdatesModule' },
      { path: 'messages', loadChildren: '../messages/messages.module#MessagesModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    TrimwordPipe
  ],
  providers: []
})
export class DashboardModule { }
