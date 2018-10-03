import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from '../../components/login/login.component';
import { HeaderComponent } from '../../components/header/header.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent,
    HeaderComponent
  ],
  providers: []
})
export class LoginModule { }
