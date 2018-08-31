import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../../classes/user';

import { HttpService } from '../../services/http.service';
import { MessageService } from '../../services/message.service';

let that;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [HttpService, MessageService]
})
export class ChatComponent implements OnInit {

  msgarray: any[] = [];
  user: User = {
    handle: '',
    recepient: '',
    message: ''
  };
  typing = {
    handle: '',
    status: false
  };
  message = {
    text: 'What\'s up!',
    to: 'abhisek507'
  };

  constructor(private socket: Socket, private http: HttpService, private SocketIO: MessageService) {
  }

  ngOnInit() {
    that = this;

    this.typing.handle = this.http.getCookie('r-v-user');
    this.user.handle = that.typing.handle;

    this.socket.on('chat', this.onChat);
    this.socket.on('started typing', this.onTypingStart);
    this.socket.on('completed typing', this.onTypingStop);

    /**
     * @default username is the loggedin username
     * @default group will have all the available group chat id for this user
     */
    let data = {
      username: this.user.handle,
      group: ['5b7f7dc326a1ea051cf57b32']
    };
    this.socket.emit('new connection', data);
  }

  onKey(event: KeyboardEvent) {
    this.socket.emit('started typing', this.user.handle);
  }

  onFocusout(event: any) {
    this.socket.emit('completed typing', this.user.handle);
  }

  send(event: MouseEvent) {
    this.msgarray.push(Object.assign({}, this.user));
    const chat = Object.assign({}, this.user);
    this.SocketIO.emit('chat', Object.assign(this.message, {text: chat.message, from: chat.handle, to: chat.recepient}))
    this.user.message = '';
  }

  /**
   * callback for chat send
   * @param data 
   * @description doesn't accept this pointer of Angular
   */
  /* onchat(data) {
    that.msgarray.push(Object.assign({}, data));
  }

  ontypingstart(data) {
    that.typing.handle = data;
    that.typing.status = true;
  }

  ontypingstop(data) {
    that.typing.status = false;
  } */

  onChat(data) {
    that.msgarray.push(Object.assign({}, data));
  }

  onTypingStart(data) {
    that.typing.handle = data;
    that.typing.status = true;
  }

  onTypingStop(data) {
    that.typing.status = false;
  }
}
