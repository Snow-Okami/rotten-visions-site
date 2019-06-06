import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAchievementComponent } from './create-achievement.component';

const routes: Routes = [
  {
    path: '',
    component: CreateAchievementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAchievementRoutingModule { }
