import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { FooterComponent } from '../../components/footer/footer.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: '/dashboard/games', pathMatch: 'full' },
      { path: 'games', loadChildren: '../games/games.module#GamesModule' },
      { path: 'updates', loadChildren: '../updates/updates.module#UpdatesModule' },
      { path: 'messages', loadChildren: '../messages/messages.module#MessagesModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    FooterComponent
  ],
  providers: []
})
export class DashboardModule { }
