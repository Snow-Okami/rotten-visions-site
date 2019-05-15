import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewGamesRoutingModule } from './view-games-routing.module';
import { ViewGamesComponent } from './view-games.component';

@NgModule({
  declarations: [ViewGamesComponent],
  imports: [
    CommonModule,
    ViewGamesRoutingModule
  ]
})
export class ViewGamesModule { }
