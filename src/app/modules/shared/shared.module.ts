import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
/**
 * @description Socket Modules for Social Chat.
 */
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
/**
 * @description Custom Trim Word Pipe.
 */
import { TrimwordPipe } from '../../pipes/trimword.pipe';
import { NameonlyPipe } from '../../pipes/nameonly.pipe';
import { UnameonlyPipe } from '../../pipes/unameonly.pipe';

import { environment } from '../../../environments/environment';

import { FooterComponent } from '../../components/footer/footer.component';

/**
 * @description domain update with production type.
 */
// const apiurl = environment.production ? 'https://psynapsus.herokuapp.com' : 'http://localhost:5000';
/**
 * @description Select domain available only on Heroku.
 */
const apiurl = 'https://psynapsus.herokuapp.com';
const config: SocketIoConfig = { url: apiurl, options: {} };

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SocketIoModule.forRoot(config),
  ],
  declarations: [
    /**
     * @description Shares Pipes For Lazy Routing Modules.
     */
    TrimwordPipe,
    NameonlyPipe,
    UnameonlyPipe,

    /**
     * @description Shared Components For Lazy Routing Modules.
     */
    FooterComponent
  ],
  exports: [
    /**
     * @description Shares Pipes For Lazy Routing Modules.
     */
    TrimwordPipe,
    NameonlyPipe,
    UnameonlyPipe,

    /**
     * @description Shared modules are stored here.
     */
    SocketIoModule,

    /**
     * @description Shared Components For Lazy Routing Modules.
     */
    FooterComponent
  ]
})
export class SharedModule { }
