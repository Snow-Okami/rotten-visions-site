import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchievementsComponent } from './achievements.component';

const routes: Routes = [
  {
    path: '',
    component: AchievementsComponent
  },
  {
    path: 'view-own',
    loadChildren: '../view-own-achievements/view-own-achievements.module#ViewOwnAchievementsModule'
  },
  {
    path: 'create',
    loadChildren: '../create-achievement/create-achievement.module#CreateAchievementModule'
  },
  {
    path: 'edit/:_id',
    loadChildren: '../edit-achievement/edit-achievement.module#EditAchievementModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/achievements'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchievementsRoutingModule { }
