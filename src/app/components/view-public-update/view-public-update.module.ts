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
import { ViewPublicUpdateRoutingModule } from './view-public-update-routing.module';
import { ViewPublicUpdateComponent } from './view-public-update.component';

@NgModule({
  declarations: [ViewPublicUpdateComponent],
  imports: [
    CommonModule,
    ViewPublicUpdateRoutingModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule, SharedModule
  ]
})
export class ViewPublicUpdateModule { }
