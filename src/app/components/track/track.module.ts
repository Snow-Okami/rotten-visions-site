import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRoutingModule } from './track-routing.module';
import { TrackComponent } from './track.component';

import { MaterialModule } from '../../modules/material/material.module';

@NgModule({
  declarations: [TrackComponent],
  imports: [
    CommonModule,
    TrackRoutingModule,
    MaterialModule
  ]
})
export class TrackModule { }
