import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

/**
 * @description SharedModule contains the shared Components throughout Psynapsus.
 */
import { SharedModule } from '../shared/shared.module';

import { LandingComponent } from '../../components/landing/landing.component';
import { LoginComponent } from '../../components/login/login.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LandingComponent,
    LoginComponent
  ],
  providers: []
})
export class LandingModule { }
