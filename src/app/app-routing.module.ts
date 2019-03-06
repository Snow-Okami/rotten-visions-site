import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [ AuthguardService ],
    loadChildren: './components/landing/landing.module#LandingModule'
  },
  {
    path: 'dashboard',
    pathMatch: 'prefix',
    canActivate: [ AuthguardService ],
    loadChildren: './components/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '**',
    loadChildren: './components/notfound/notfound.module#NotfoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
