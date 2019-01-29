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

import { UpdatesComponent } from '../../components/updates/updates.component';

export const routes: Routes = [
  { path: '', component: UpdatesComponent },
  { path: 'create', loadChildren: '../create-update/create-update.module#CreateUpdateModule' },
  { path: 'view/:id', loadChildren: '../view-update/view-update.module#ViewUpdateModule' },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule, SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UpdatesComponent
  ],
  providers: []
})
export class UpdatesModule { }


