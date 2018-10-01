import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { DemoComponent } from '../../components/demo/demo.component';

export const routes: Routes = [
  { path: '', component: DemoComponent },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    DemoComponent
  ],
  providers: []
})
export class DemoModule { }
