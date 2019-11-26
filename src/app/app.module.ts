import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './modules/material/material.module';

import { RoutingModule } from './modules/routing/routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

// const config: SocketIoConfig = { url: 'http://localhost:3333', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SnackbarComponent
  ],
  entryComponents: [
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    HttpClientModule,
    // SocketIoModule.forRoot(config)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

