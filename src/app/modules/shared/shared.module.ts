import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimwordPipe } from '../../pipes/trimword.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [

    TrimwordPipe

  ],
  declarations: [

    TrimwordPipe

  ]
})
export class SharedModule { }
