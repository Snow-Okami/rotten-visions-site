import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TrimwordPipe } from '../../pipes/trimword.pipe';

import { UpdatesComponent } from '../../components/updates/updates.component';

export const routes: Routes = [
  { path: '', component: UpdatesComponent },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UpdatesComponent,
    TrimwordPipe
  ]
})
export class UpdatesModule { }
