import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';


/**
 * @description SharedModule contains the shared Components throughout Psynapsus.
 */
import { SharedModule } from '../shared/shared.module';

import { NotfoundComponent } from '../../components/notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: NotfoundComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    NotfoundComponent
  ],
  providers: []
})
export class NotfoundModule { }
