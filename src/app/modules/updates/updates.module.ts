import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { UpdatefilterPipe } from '../../pipes/updatefilter.pipe';

import { SharedModule } from '../../modules/shared/shared.module';

import { UpdatesComponent } from '../../components/updates/updates.component';

export const routes: Routes = [
  { path: '', component: UpdatesComponent },
  { path: 'view/:id', loadChildren: '../view-update/view-update.module#ViewUpdateModule' }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule,
    RouterModule.forChild(routes), SharedModule
  ],
  declarations: [
    UpdatesComponent,
    UpdatefilterPipe
  ]
})
export class UpdatesModule { }
