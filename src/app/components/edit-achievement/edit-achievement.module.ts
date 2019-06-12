import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditAchievementRoutingModule } from './edit-achievement-routing.module';
import { EditAchievementComponent } from './edit-achievement.component';

@NgModule({
  declarations: [EditAchievementComponent],
  imports: [
    CommonModule,
    EditAchievementRoutingModule
  ]
})
export class EditAchievementModule { }
