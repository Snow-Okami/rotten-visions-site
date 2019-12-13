import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatesRoutingModule } from './updates-routing.module';
import { UpdatesComponent } from './updates.component';

import { SharedModule } from '../../modules/shared/shared.module';


@NgModule({
  declarations: [UpdatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    UpdatesRoutingModule
  ]
})
export class UpdatesModule { }
