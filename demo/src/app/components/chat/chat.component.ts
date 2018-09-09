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
    username: '',
    type: '',
    chatId: ''
  };
  public messages = [];
  public text = '';
  public showTyping = {
    text: '',
    status: false,
    actualText: false
  }

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
        this.socket.on('typing', this.onTyping);
        this.socket.on('stopped typing', this.stoppedTyping);
        this.socket.on('private message', this.privateMessage);
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
    if(!o.messages.length || o.mcache) {
      this.http.getMessages(o.chatId)
      .subscribe(resp => {
        if(resp['message']['type'] != 'error') {
          if(o.mcache) { o.messages = resp['data']; }
          else { o.messages = _.concat(o.messages, resp['data']); }
          this.messages = o.messages;
          o.mcache = false;
        }
      });
    }
    this.recipient = {
      fname: o.fname,
      lname: o.lname,
      username: o.member,
      type: o.type,
      chatId: o.chatId
    };
    this.messages = o.messages;
    _.forEach(this.chatList, (li) => {
      li.selected = false;
    });
    o.selected = true;
    this.msgview = true;
  }

  onKey(event: KeyboardEvent) {
    if(!event.isTrusted) { event.preventDefault(); return; }
    let typingText;
    if(this.showTyping.actualText) {
      typingText = `${this.user.fname} ${this.user.lname}: ${this.text} ...`;
    } else {
      typingText = `${this.user.fname} ${this.user.lname} is typing...`;
    }
    this.socketio.typing(Object.assign({}, this.recipient, {typingText: typingText}));
  }

  onEnter(event: KeyboardEvent) {
    if(event.code != 'Enter') { return; }
    this.socketio.sendMessage(Object.assign({}, this.recipient, {text: this.text}));
    let recipient = _.find(this.chatList, ['member', this.recipient.username]);
    recipient.lastText = this.text;
    recipient.messages.push({
      createdBy: this.user.username,
      to: this.recipient.username,
      text: this.text
    });
    this.text = '';
    this.socketio.stoppedTyping(this.recipient);

    /**
     * @description : auto scroll to end event.
     */
    setTimeout(() => {
      let item = document.getElementById('bottom-element');
      item.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 500);
  }

  onTyping(text) {
    that.showTyping.text = text;
    that.showTyping.status = true;
  }

  onFocusout(event: any) {
    this.socketio.stoppedTyping(this.recipient);
  }

  stoppedTyping() {
    that.showTyping.text = '';
    that.showTyping.status = false;
  }

  privateMessage(data) {
    let recipient = _.find(that.chatList, ['member', data.createdBy]);
    recipient.lastText = data.text;
    recipient.messages.push(data);
  }

}
