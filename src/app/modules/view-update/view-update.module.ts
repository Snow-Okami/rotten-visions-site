import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
/**
 * @description Load images lazely.
 */
import { LazyLoadImageModule } from 'ng-lazyload-image';

/**
 * @description SharedModule contains the shared Components & Pipes throughout Psynapsus.
 */
import { SharedModule } from '../shared/shared.module';

import { ViewUpdateComponent } from '../../components/view-update/view-update.component';

export const routes: Routes = [
  { path: '', component: ViewUpdateComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule, SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ViewUpdateComponent
  ]
})
export class ViewUpdateModule { }
