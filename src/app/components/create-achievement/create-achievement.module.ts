import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateAchievementRoutingModule } from './create-achievement-routing.module';
import { CreateAchievementComponent } from './create-achievement.component';

/**
 * @description MaterialModule is for Material theme.
 * @description Load images lazely.
 * @description SharedModule contains the shared Components & Pipes throughout Psynapsus.
 */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [CreateAchievementComponent],
  imports: [
    SharedModule,
    CommonModule,
    MaterialModule,
    LazyLoadImageModule,
    CreateAchievementRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class CreateAchievementModule { }
