import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'about', loadChildren: () => import('../about/about.module').then(mod => mod.AboutModule) },
      { path: 'contact', loadChildren: () => import('../contact/contact.module').then(mod => mod.ContactModule) },
      { path: 'home', loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule) },
      { path: 'projects', loadChildren: () => import('../projects/projects.module').then(mod => mod.ProjectsModule) },
      { path: 'updates', loadChildren: () => import('../updates/updates.module').then(mod => mod.UpdatesModule) },
      { path: 'notfound', loadChildren: () => import('../notfound/notfound.module').then(mod => mod.NotfoundModule) },
      
      { path: '', pathMatch: 'full', redirectTo: '/updates' },

      { path: '**', redirectTo: '/notfound' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
