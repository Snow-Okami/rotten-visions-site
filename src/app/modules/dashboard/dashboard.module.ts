import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', loadChildren: '../home/home.module#HomeModule' },
      { path: 'about', loadChildren: '../about/about.module#AboutModule' },
      { path: 'projects', loadChildren: '../projects/projects.module#ProjectsModule' },
      { path: 'updates', loadChildren: '../updates/updates.module#UpdatesModule' },
      { path: 'contact', loadChildren: '../contact/contact.module#ContactModule' },
      { path: '**', loadChildren: '../notfound/notfound.module#NotfoundModule' }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent
  ],
  providers: []
})
export class DashboardModule { }
