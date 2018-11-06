import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { ViewUpdateComponent } from '../../components/view-update/view-update.component';

export const routes: Routes = [
  { path: '', component: ViewUpdateComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ViewUpdateComponent
  ]
})
export class ViewUpdateModule { }
