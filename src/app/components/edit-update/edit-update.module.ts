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
import { EditUpdateRoutingModule } from './edit-update-routing.module';
import { EditUpdateComponent } from './edit-update.component';

@NgModule({
  declarations: [EditUpdateComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule, SharedModule,
    EditUpdateRoutingModule
  ]
})
export class EditUpdateModule { }
