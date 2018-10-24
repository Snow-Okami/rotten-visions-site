import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../../environments/environment';

import { LandingComponent } from '../../components/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    LandingComponent
  ],
  providers: []
})
export class LandingModule { }
