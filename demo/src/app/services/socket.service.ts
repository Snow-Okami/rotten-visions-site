import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { StoreService } from './store.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket, private store: StoreService, private http: HttpService) { }

  login() {
    let auth = {
      username: this.store.getCookie('r-v-user'),
      token: this.store.getCookie('r-v-token')
    }
    this.socket.emit('login', auth);
  }
}
