import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAchievementComponent } from './edit-achievement.component';

const routes: Routes = [
  {
    path: '',
    component: EditAchievementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAchievementRoutingModule { }
