import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from '../../components/chat/chat.component';

export const routes: Routes = [
  { path: '', component: ChatComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ChatComponent
  ]
})
export class SocketModule { }
