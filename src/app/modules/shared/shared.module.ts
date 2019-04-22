import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimwordPipe } from '../../pipes/trimword.pipe';

/**
 * @description Perfect scroll bar settings.
 */
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  suppressScrollY: false
};

@NgModule({
  imports: [

    CommonModule,
    PerfectScrollbarModule

  ],
  exports: [

    TrimwordPipe,
    PerfectScrollbarModule

  ],
  declarations: [

    TrimwordPipe

  ]
})
export class SharedModule { }
