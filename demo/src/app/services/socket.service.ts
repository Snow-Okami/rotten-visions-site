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
    let username = this.store.getCookie('r-v-user');
    this.http.getChats(username)
    .subscribe(resp => {
      let data = { username: username, group: resp['list'], chats: resp['modifiedList'] };
      this.socket.emit('login', 'Hi! there.');
      console.log(data);
    });
  }
}
