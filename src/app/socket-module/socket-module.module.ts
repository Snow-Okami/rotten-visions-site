import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from '../components/chat/chat.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

export const routes: Routes = [
  { path: '', component: ChatComponent },
];

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class SocketModuleModule { }
