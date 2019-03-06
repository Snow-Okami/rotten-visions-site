import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

import { SharedModule } from '../../modules/shared/shared.module';
import { MaterialModule } from '../../modules/material/material.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
