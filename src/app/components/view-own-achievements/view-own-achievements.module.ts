import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewOwnAchievementsRoutingModule } from './view-own-achievements-routing.module';
import { ViewOwnAchievementsComponent } from './view-own-achievements.component';

/**
 * @description MaterialModule is for Material theme.
 * @description Load images lazely.
 * @description SharedModule contains the shared Components & Pipes throughout Psynapsus.
 */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [ViewOwnAchievementsComponent],
  imports: [
    CommonModule,
    ViewOwnAchievementsRoutingModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule, SharedModule
  ]
})
export class ViewOwnAchievementsModule { }
