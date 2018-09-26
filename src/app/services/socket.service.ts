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
    };
    this.socket.emit('login', auth);
  }

  typing(recipient) {
    let auth = Object.assign(recipient, {token: this.store.getCookie('r-v-token')});
    this.socket.emit('typing', auth);
  }

  stoppedTyping(recipient) {
    let auth = Object.assign(recipient, {token: this.store.getCookie('r-v-token')});
    this.socket.emit('stopped typing', auth);
  }

  getAvailableUsers() {
    let auth = {
      username: this.store.getCookie('r-v-user'),
      token: this.store.getCookie('r-v-token')
    };
    this.socket.emit('get available users', auth);
  }

  sendMessage(recipient) {
    let auth = Object.assign(recipient, {
      token: this.store.getCookie('r-v-token'),
      createdBy: this.store.getCookie('r-v-user')
    });
    if(recipient.type === 'private') { this.socket.emit('private message', auth); }
  }

  createGroup(data) {
    let auth = Object.assign(data, {
      token: this.store.getCookie('r-v-token'),
      createdBy: this.store.getCookie('r-v-user')
    });
    this.socket.emit('create group', auth);
  }

}
