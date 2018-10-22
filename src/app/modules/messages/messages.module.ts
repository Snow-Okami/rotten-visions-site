import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TrimwordPipe } from '../../pipes/trimword.pipe';

import { MessagesComponent } from '../../components/messages/messages.component';

export const routes: Routes = [
  { path: '', component: MessagesComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MessagesComponent,
    TrimwordPipe
  ],
  providers: []
})
export class MessagesModule { }



