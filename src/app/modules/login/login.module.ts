import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from '../../components/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule { }