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
  public connection = {
    status: false,
    text: 'Connecting...'
  };
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
  public enableAddUserToGroup = false;
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
  public selectedUserList = [];
  public selectedUserWidth = '0px';
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
        this.socket.on('logged in', this.loggedIn);
        this.socket.on('logged out', this.loggedOut);
        this.socket.on('typing', this.onTyping);
        this.socket.on('stopped typing', this.stoppedTyping);
        this.socket.on('private message', this.privateMessage);
        this.socket.on('available users', this.showAvailableUsers);
        this.socket.on('message sent', this.messageSent);
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

    this.manageWith();
  }

  showNoneView() {
    /**
     * Change Template Views As Required
     */
    this.msgview = false;
    this.noneview = true;
    this.selectuserview = false;

    this.messages = [];
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

  manageWith() {
    /**
     * Set Scroll With For Selected User Names
     */
    setTimeout(() => {
      let width = 0;
      let allUsers = document.querySelectorAll('.selected-user');
      _.forEach(allUsers, (o, i) => {
        width = width + o.getBoundingClientRect().width + 4;
      });
      this.selectedUserWidth = width + 'px';
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
          this.smoothScroll('instant');
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

  showAddGroupOption() {
    this.enableAddUserToGroup = !this.enableAddUserToGroup;
  }

  selectThisUser(o) {
    o.checked = !o.checked;
    let allmember = _.find(this.availUserList.all, ['member', o.member]);
    if(allmember !== undefined) { allmember.checked = o.checked; }
    let recomember = _.find(this.availUserList.recommended, ['member', o.member]);
    if(recomember !== undefined) { recomember.checked = o.checked; }

    if(!o.checked) {
      _.pullAllBy(this.selectedUserList, [{ 'member': o.member }], 'member');
    } else {
      this.selectedUserList.push(o);
    }
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
    this.messages = [];

    let li = _.find(this.chatList, 'selected');
    if(li != undefined) { li.selected = false; }

    this.socketio.getAvailableUsers();
  }

  getMessageForThis(o) {
    if(this.enableAddUserToGroup === true) { this.selectThisUser(o); return; }
    let m = _.find(this.chatList, ['member', o.member]);
    if(m === undefined) {
      this.newChat = Object.assign({}, o, {selected: true, messages: [], lastText: '', type: 'private'});
      this.recipient = {fname: o.fname, lname: o.lname, username: o.member, type: this.newChat['type'], chatId: undefined};
      this.messages = this.newChat.messages;
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
    if(recipient != undefined) {
      recipient.lastText = this.text;
      recipient.messages.push({
        createdBy: this.user.username,
        to: this.recipient.username,
        text: this.text
      });
    } else {
      this.newChat.lastText = this.text;
      this.newChat.messages.push({
        createdBy: this.user.username,
        to: this.recipient.username,
        text: this.text
      });
    }
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

  loggedIn() {
    that.connection.status = true;
  }

  loggedOut() {
    that.connection = {
      status: false,
      text: 'Connection Error!'
    };
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

  messageSent(data) {
    let recipient = _.find(that.chatList, ['member', data.to]);
    if(recipient != undefined) { return; }
    let o = {
      chatId: data.chatId,
      roomId: 'r_v_' + data.chatId,
      fname: data['touser']['fname'],
      lname: data['touser']['lname'],
      type: data.type,
      selected: true,
      lastText: data.text,
      member: data.to,
      messages: []
    };
    o.messages.push(data);

    that.recipient = {
      fname: o.fname,
      lname: o.lname,
      username: o.member,
      type: o.type,
      chatId: o.chatId
    };
    that.chatList.push(o);

    that.messages = o.messages;
    that.newChat.selected = false;

    /**
     * Change Template Views As Required
     */
    that.msgview = true;
    that.noneview = false;
    that.selectuserview = false;
    that.smoothScroll('instant');
  }

  showAvailableUsers(res) {
    that.availUserList = res.data;
  }

}
