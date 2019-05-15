import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @description MaterialModule is for Material theme.
 * @description Load images lazely.
 * @description SharedModule contains the shared Components & Pipes throughout Psynapsus.
 */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    GamesRoutingModule,
    LazyLoadImageModule
  ]
})
export class GamesModule { }
