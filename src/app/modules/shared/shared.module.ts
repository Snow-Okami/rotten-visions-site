import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MaterialModule } from '../material/material.module';

import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

import { UpdatefilterPipe } from '../../pipes/updatefilter.pipe';
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
  declarations: [
    SnackbarComponent,
    UpdatefilterPipe,
    TrimwordPipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    PerfectScrollbarModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    LazyLoadImageModule,
    ReactiveFormsModule,

    UpdatefilterPipe,
    TrimwordPipe,

    PerfectScrollbarModule
  ]
})
export class SharedModule { }
