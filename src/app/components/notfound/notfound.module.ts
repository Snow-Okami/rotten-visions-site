import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material/material.module';
/**
 * @description SharedModule contains the shared Components throughout Psynapsus.
 */
import { SharedModule } from '../../modules/shared/shared.module';

import { NotfoundRoutingModule } from './notfound-routing.module';
import { NotfoundComponent } from './notfound.component';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, SharedModule,
    NotfoundRoutingModule
  ]
})
export class NotfoundModule { }
