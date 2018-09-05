import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { StoreService } from '../../services/store.service';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';

import { User } from '../../interfaces/user';

let that;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public msgview = false;
  public user: User = {
    fname: '',
    lname: '',
    username: '',
    filename: '',
    email: '',
    status: 'online'
  };
  public chatList = [];
  public recepient = {
    fname: '',
    lname: ''
  };

  constructor(private socket: Socket, private http: HttpService, private store: StoreService, private socketio: SocketService) { }

  ngOnInit() {
    that = this;
    let username = this.store.getCookie('r-v-user');
    
    this.http.getUser(username)
    .subscribe(resp => {
      if(resp['message']['type'] != 'error') {
        this.user = resp['data'];
        this.socketio.login();

        this.http.getChats(username)
        .subscribe(r => {
          if(r['message']['type'] != 'error') {
            this.chatList = r['data']['chatList'];
          } else {
            alert(r['message']['text']);
          }
        }) 
      } else {
        alert(resp['message']['text']);
      }
    });
  }

}
