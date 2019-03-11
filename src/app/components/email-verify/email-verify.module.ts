import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../modules/shared/shared.module';
import { MaterialModule } from '../../modules/material/material.module';

import { EmailVerifyRoutingModule } from './email-verify-routing.module';
import { EmailVerifyComponent } from './email-verify.component';

@NgModule({
  declarations: [EmailVerifyComponent],
  imports: [
    CommonModule,
    EmailVerifyRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class EmailVerifyModule { }
