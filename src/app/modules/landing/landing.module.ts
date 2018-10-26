import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { LandingComponent } from '../../components/landing/landing.component';
import { LoginComponent } from '../../components/login/login.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LandingComponent,
    LoginComponent
  ],
  providers: []
})
export class LandingModule { }
