import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { CreateUpdateComponent } from '../../components/create-update/create-update.component';

export const routes: Routes = [
  { path: '', component: CreateUpdateComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreateUpdateComponent
  ]
})
export class CreateUpdateModule { }
