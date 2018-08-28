import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../../classes/user';

/**
 * @description will be used for 3rd way
 */
// import { HttpService } from '../../services/http.service';

/**
 * @description is in use for 2nd way
 */
import { MessageService } from '../../services/message.service';

let that;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [MessageService]
})
export class ChatComponent implements OnInit {

  msgarray: any[] = [];
  user: User = {
    handle: '',
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

  constructor(private socket: Socket, private SocketIO: MessageService) {
  }

  ngOnInit() {
    that = this;

    this.socket.on('chat', this.onChat);
    this.socket.on('started typing', this.onTypingStart);
    this.socket.on('completed typing', this.onTypingStop);

    this.socket.emit('new connection', 'abhisek507');
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
    this.SocketIO.emit('chat', Object.assign(this.message, {text: chat.message, to: chat.handle}))
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
