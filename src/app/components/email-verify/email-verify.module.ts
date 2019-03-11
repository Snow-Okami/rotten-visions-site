import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailVerifyRoutingModule } from './email-verify-routing.module';
import { EmailVerifyComponent } from './email-verify.component';

@NgModule({
  declarations: [EmailVerifyComponent],
  imports: [
    CommonModule,
    EmailVerifyRoutingModule
  ]
})
export class EmailVerifyModule { }
