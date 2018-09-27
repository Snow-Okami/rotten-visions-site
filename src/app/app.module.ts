import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { RoutingModule } from './modules/routing/routing.module';
import { AppComponent } from './app.component';

// const config: SocketIoConfig = { url: 'http://localhost:3333', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    // HttpClientModule,
    // SocketIoModule.forRoot(config)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

