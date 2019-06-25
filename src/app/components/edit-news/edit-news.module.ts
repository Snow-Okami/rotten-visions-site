import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditNewsRoutingModule } from './edit-news-routing.module';
import { EditNewsComponent } from './edit-news.component';

/**
 * @description MaterialModule is for Material theme.
 * @description Load images lazely.
 * @description SharedModule contains the shared Components & Pipes throughout Psynapsus.
 */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [EditNewsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    LazyLoadImageModule,
    EditNewsRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class EditNewsModule { }
