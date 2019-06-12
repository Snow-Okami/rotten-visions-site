import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditAchievementRoutingModule } from './edit-achievement-routing.module';
import { EditAchievementComponent } from './edit-achievement.component';

/**
 * @description MaterialModule is for Material theme.
 * @description Load images lazely.
 * @description SharedModule contains the shared Components & Pipes throughout Psynapsus.
 */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [EditAchievementComponent],
  imports: [
    SharedModule,
    CommonModule,
    MaterialModule,
    LazyLoadImageModule,
    EditAchievementRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class EditAchievementModule { }
