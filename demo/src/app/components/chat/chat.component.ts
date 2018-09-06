import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as _ from 'lodash';

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
  public recipient = {
    fname: '',
    lname: '',
    username: ''
  };
  public messages = [];

  constructor(private socket: Socket, private http: HttpService, private store: StoreService, private socketio: SocketService) { }

  ngOnInit() {
    that = this;
    let username = this.store.getCookie('r-v-user');

    this.http.getUser(username)
    .subscribe(resp => {
      if(resp['message']['type'] != 'error') {
        this.user = resp['data']['user'];
        this.chatList = resp['data']['chatList'];
        this.socketio.login();
      } else {
        alert(resp['message']['text']);
      }
    });
  }

  closeMessageView() {
    this.msgview = false;
    _.forEach(this.chatList, (li) => {
      li.selected = false;
    });
  }

  getMessage(o) {
    if(o.selected === true) { return; }
    if(!o.messages.length) {
      this.http.getMessages(o.chatId)
      .subscribe(resp => {
        if(resp['message']['type'] != 'error') {
          o.messages = _.concat(o.messages, resp['data']);
          this.messages = o.messages;
        }
      });
    }
    this.recipient = {
      fname: o.fname,
      lname: o.lname,
      username: o.member
    };
    this.messages = o.messages;
    _.forEach(this.chatList, (li) => {
      li.selected = false;
    });
    o.selected = true;
    this.msgview = true;
  }

}
