import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from '../../components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', loadChildren: '../home/home.module#HomeModule' },
      { path: 'about', loadChildren: '../about/about.module#AboutModule' },
      { path: 'projects', loadChildren: '../projects/projects.module#ProjectsModule' },
      { path: 'blog', loadChildren: '../blog/blog.module#BlogModule' },
      { path: 'feedback', loadChildren: '../feedback/feedback.module#FeedbackModule' }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule { }
