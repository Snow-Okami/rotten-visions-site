import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
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
export class ChatComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public msgview = false;
  public noneview = true;
  public selectuserview = false;
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
  public newChat = {
    selected: false,
    fname: '',
    lname: '',
    messages: [],
    lastText: ''
  };
  public messages = [];
  public text = '';
  public showTyping = {
    text: '',
    status: false,
    actualText: false
  };
  private bottomItem;
  public availUserList = {
    recommended: [],
    all: []
  };
  private chatPos = {};
  private topTextPos = {};

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
        this.socket.on('available users', this.showAvailableUsers);
      } else {
        alert(resp['message']['text']);
      }
    });
  }

  ngAfterViewInit() {}

  ngAfterViewChecked() {
    this.bottomItem = document.getElementById('bottom-element');
    let item = document.getElementsByClassName('all-chats');
    if(item.length > 1) {
      this.chatPos = item[1].getBoundingClientRect();
    }
    item = document.getElementsByClassName('text-message-list');
    if(item.length > 0) {
      this.topTextPos = item[0].getBoundingClientRect();
    }
  }

  showNoneView() {
    /**
     * Change Template Views As Required
     */
    this.msgview = false;
    this.noneview = true;
    this.selectuserview = false;

    this.newChat.selected = false;
    let li = _.find(this.chatList, 'selected');
    if(li != undefined) { li.selected = false; }
  }

  smoothScroll(type) {
    /**
     * @description : auto scroll to end event.
     */
    setTimeout(() => {
      this.bottomItem.scrollIntoView({ behavior: type, block: 'end' });
    }, 500);
  }

  getMessage(o) {
    if(o.selected === true) { return; }
    if(!o.messages.length || o.mcache) {
      this.http.getMessages(o.chatId, o.messages.length)
      .subscribe(resp => {
        if(resp['message']['type'] != 'error') {
          o.messages = _.concat(resp['data'], o.messages);
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

    this.newChat.selected = false;
    let li = _.find(this.chatList, 'selected');
    if(li != undefined) { li.selected = false; }
    o.selected = true;

    /**
     * Change Template Views As Required
     */
    this.msgview = true;
    this.noneview = false;
    this.selectuserview = false;
    this.smoothScroll('instant');
  }

  loadMoreMessage(event: any) {
    console.log('scroll detected...');
  }

  showSearchSection(event: any) {
    if(this.selectuserview) { return; }
    /**
     * Change Template Views As Required
     */
    this.msgview = false;
    this.noneview = false;
    this.selectuserview = true;

    this.newChat.selected = false;

    let li = _.find(this.chatList, 'selected');
    if(li != undefined) { li.selected = false; }

    this.socketio.getAvailableUsers();
  }

  getMessageForThis(o) {
    let m = _.find(this.chatList, ['member', o.member]);
    if(m === undefined) {
      this.newChat = Object.assign({}, o, {selected: true, messages: [], lastText: '', type: 'private'});
      this.recipient = {fname: o.fname, lname: o.lname, username: o.member, type: this.newChat['type'], chatId: undefined};
      this.messages = [];
      this.msgview = true;
      this.noneview = false;
      this.selectuserview = false;
    } else { this.getMessage(m); }
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
    this.smoothScroll('smooth');
  }

  onTyping(text) {
    that.showTyping.text = text;
    that.showTyping.status = true;
    if(that.msgview) { that.smoothScroll('instant'); }
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
    if(that.msgview) { that.smoothScroll('smooth'); }
  }

  showAvailableUsers(res) {
    that.availUserList = res.data;
  }

}
