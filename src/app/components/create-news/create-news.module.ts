import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateNewsRoutingModule } from './create-news-routing.module';
import { CreateNewsComponent } from './create-news.component';

/**
 * @description MaterialModule is for Material theme.
 * @description Load images lazely.
 * @description SharedModule contains the shared Components & Pipes throughout Psynapsus.
 */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [CreateNewsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    LazyLoadImageModule,
    CreateNewsRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class CreateNewsModule { }
