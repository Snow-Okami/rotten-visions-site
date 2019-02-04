import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../modules/shared/shared.module';

import { ViewUpdateComponent } from '../../components/view-update/view-update.component';

export const routes: Routes = [
  { path: '', component: ViewUpdateComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ViewUpdateComponent,
  ]
})
export class ViewUpdateModule { }
