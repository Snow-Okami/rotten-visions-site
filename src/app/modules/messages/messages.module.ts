import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * @description Socket Modules for Social Chat.
 */
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
/**
 * @description MaterialModule is for Material theme.
 * @description Load images lazely.
 * @description SharedModule contains the shared Components & Pipes throughout Psynapsus.
 */
import { MaterialModule } from '../material/material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SharedModule } from '../shared/shared.module';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { MessagesComponent } from '../../components/messages/messages.component';

import { environment } from '../../../environments/environment';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  suppressScrollY: false
};

export const routes: Routes = [
  { path: '', component: MessagesComponent }
];
/**
 * @description domain update with production type.
 */
const apiurl = environment.production ? 'https://psynapsus.herokuapp.com' : 'http://localhost:5000';
/**
 * @description Select domain available only on Heroku.
 */
// const apiurl = 'https://psynapsus.herokuapp.com';
const config: SocketIoConfig = { url: apiurl, options: {} };

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MaterialModule, LazyLoadImageModule, SharedModule,
    RouterModule.forChild(routes), PerfectScrollbarModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    MessagesComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class MessagesModule { }



