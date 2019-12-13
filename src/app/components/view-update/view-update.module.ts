import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUpdateRoutingModule } from './view-update-routing.module';
import { ViewUpdateComponent } from './view-update.component';

import { SharedModule } from '../../modules/shared/shared.module';


@NgModule({
  declarations: [ViewUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    ViewUpdateRoutingModule
  ]
})
export class ViewUpdateModule { }
