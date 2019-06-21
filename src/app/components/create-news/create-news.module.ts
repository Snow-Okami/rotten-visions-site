import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateNewsRoutingModule } from './create-news-routing.module';
import { CreateNewsComponent } from './create-news.component';

@NgModule({
  declarations: [CreateNewsComponent],
  imports: [
    CommonModule,
    CreateNewsRoutingModule
  ]
})
export class CreateNewsModule { }
