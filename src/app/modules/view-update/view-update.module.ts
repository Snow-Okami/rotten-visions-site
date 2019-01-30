import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { ViewUpdateComponent } from '../../components/view-update/view-update.component';

export const routes: Routes = [
  { path: '', component: ViewUpdateComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule, LazyLoadImageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewUpdateComponent]
})
export class ViewUpdateModule { }
