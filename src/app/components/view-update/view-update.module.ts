import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material/material.module';
/**
 * @description Load images lazely.
 */
import { LazyLoadImageModule } from 'ng-lazyload-image';

/**
 * @description SharedModule contains the shared Components & Pipes throughout Psynapsus.
 */
import { SharedModule } from '../../modules/shared/shared.module';

import { ViewUpdateRoutingModule } from './view-update-routing.module';
import { ViewUpdateComponent } from './view-update.component';

@NgModule({
  declarations: [ViewUpdateComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule, SharedModule,
    ViewUpdateRoutingModule
  ]
})
export class ViewUpdateModule { }
