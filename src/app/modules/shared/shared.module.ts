import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
/**
 * @description
 */
import { LazyLoadImageModule } from 'ng-lazyload-image';
/**
 * @description Socket Modules for Social Chat.
 */
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
/**
 * @description Perfect scroll bar settings.
 */
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
/**
 * @description Custom Trim Word Pipe.
 */
import { TrimwordPipe } from '../../pipes/trimword.pipe';
import { NameonlyPipe } from '../../pipes/nameonly.pipe';
import { UnameonlyPipe } from '../../pipes/unameonly.pipe';
import { AvataronlyPipe } from '../../pipes/avataronly.pipe';
import { SafePipe } from '../../pipes/safe.pipe';

import { environment } from '../../../environments/environment';

import { FooterComponent } from '../../components/footer/footer.component';
import { UserListComponent } from '../../components/dialogs/user-list/user-list.component';
import { ConfirmComponent } from '../../components/dialogs/confirm/confirm.component';

/**
 * @description domain update with production type.
 */
const apiurl = environment.production ? 'https://psynapsus.appspot.com' : 'http://localhost:5000';
/**
 * @description Select domain available only on Google Cloud.
 */
// const apiurl = 'https://psynapsus.appspot.com';
const config: SocketIoConfig = { url: apiurl, options: {} };

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  suppressScrollY: false
};

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LazyLoadImageModule,
    PerfectScrollbarModule,
    SocketIoModule.forRoot(config),
  ],
  declarations: [
    /**
     * @description Shares Pipes For Lazy Routing Modules.
     */
    TrimwordPipe,
    NameonlyPipe,
    UnameonlyPipe,
    AvataronlyPipe,
    SafePipe,

    /**
     * @description Shared Components For Lazy Routing Modules.
     */
    FooterComponent,
    UserListComponent,
    ConfirmComponent
  ],
  exports: [
    /**
     * @description Shares Pipes For Lazy Routing Modules.
     */
    TrimwordPipe,
    NameonlyPipe,
    UnameonlyPipe,
    AvataronlyPipe,
    SafePipe,

    /**
     * @description Shared modules are stored here.
     */
    SocketIoModule,
    PerfectScrollbarModule,

    /**
     * @description Shared Components For Lazy Routing Modules.
     */
    FooterComponent,
    UserListComponent,
    ConfirmComponent
  ],
  entryComponents: [
    UserListComponent,
    ConfirmComponent
  ]
})
export class SharedModule { }
