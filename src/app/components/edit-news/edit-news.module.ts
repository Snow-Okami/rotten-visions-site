import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditNewsRoutingModule } from './edit-news-routing.module';
import { EditNewsComponent } from './edit-news.component';

@NgModule({
  declarations: [EditNewsComponent],
  imports: [
    CommonModule,
    EditNewsRoutingModule
  ]
})
export class EditNewsModule { }
