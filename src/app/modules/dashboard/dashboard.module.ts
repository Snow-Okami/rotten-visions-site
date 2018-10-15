import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TrimwordPipe } from '../../pipes/trimword.pipe';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    TrimwordPipe
  ],
  providers: []
})
export class DashboardModule { }
