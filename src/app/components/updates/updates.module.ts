import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * @description Load images lazely.
 */
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { MaterialModule } from '../../modules/material/material.module';
import { NgbootstrapModule } from '../../modules/ngbootstrap/ngbootstrap.module';
import { SharedModule } from '../../modules/shared/shared.module';

import { UpdatesRoutingModule } from './updates-routing.module';
import { UpdatesComponent } from './updates.component';

@NgModule({
  declarations: [UpdatesComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule, SharedModule,
    UpdatesRoutingModule, NgbootstrapModule
  ]
})
export class UpdatesModule { }
