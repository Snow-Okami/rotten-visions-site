import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { UpdatesComponent } from '../../components/updates/updates.component';

export const routes: Routes = [
  { path: '', component: UpdatesComponent },
  { path: 'create', loadChildren: '../create-update/create-update.module#CreateUpdateModule' },
  { path: 'view', loadChildren: '../view-update/view-update.module#ViewUpdateModule' },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UpdatesComponent
  ],
  providers: []
})
export class UpdatesModule { }


