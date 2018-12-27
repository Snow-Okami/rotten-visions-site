import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { Socket } from 'ngx-socket-io';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import * as _ from 'lodash';

import { StoreService } from '../../services/store.service';
import { HttpService } from '../../services/http.service';
import { ValidatorsService } from '../../services/validators.service';

let that;

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Messages Dashboard';

  /**
   * @description Holds all the available chats for the user.
   */
  public chats = [];
  public chatView = false;
  public chatLoader = true;
  public messageLoader = false;
  public quickText = false;
  public messages = [];
  public createView = false;

  public chat = {
    id: '0',
    type: 0,
    fullName: '',
    messages: [],
    users: [{ fullName: 'Recipient Name', email: 'recipient@example.com' }]
  };
  public user = { firstName: 'User', fullName: 'User Name', email: 'user@example.com' };

  private progressBar;
  public config: PerfectScrollbarConfigInterface = { };
  /**
   * @description captures the chat list element from DOM.
   */
  private chatListElem;
  @ViewChild('chatList') chatList?: PerfectScrollbarComponent;
  /**
   * @description captures the message list element from DOM.
   */
  private messageListElem;
  @ViewChild('messageList') messageList?: PerfectScrollbarComponent;

  public text = new FormControl({ value: '', disabled: false }, []);
  /**
   * @description allows to load more messages and chats.
   */
  public loadMore = {
    messages: true,
    chats: true
  };
  private lastScrollTop = -1;

  /**
   * @description search users section for create message.
   */
  public searchInput = new FormControl({ value: '', disabled: false }, []);
  /**
   * @description store the user results after search.
   */
  public searchedUsers = [];

  constructor(
    private socket: Socket,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private http: HttpService,
    private store: StoreService,
    public snackBar: MatSnackBar,
    private regx: ValidatorsService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    /**
     * @description Initialize the this object into that.
     */
    that = this;
    /**
     * @description Initializes the progress bar.
     */
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    /**
     * @description Attach Socket Events. Note Events must use that in place of Components this.
     */
    if(!this.store.socketInitialized) {
      this.socket.on('user', this.onUser);
      this.socket.on('chats', this.onChats);
      this.socket.on('messages', this.onMessages);
      this.socket.on('texted', this.onTexted);
      this.socket.on('packet', this.onPacket);
      this.socket.on('cPacket', this.onCPacket);
      this.socket.on('typing', this.onTyping);
      /**
       * @description Update the store for future use.
       */
      this.store.socketInitialized = true;
    }
  }

  ngAfterViewInit() {
    /**
     * @description capture the scroll bar elements from browser DOM.
     */
    this.chatListElem = document.querySelectorAll('.ps')[0];
    this.messageListElem = document.querySelectorAll('.ps')[1];
    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

    let auth = Object.assign({}, this.store.cookieString());
    this.socket.emit('login', auth);
  }

  ngOnDestroy() {
    // this.socket.disconnect(true);
  }

  private scrollToBottom(): void {
    setTimeout(() => { this.messageList.directiveRef.scrollToBottom(); }, 300);
  }

  private scrollYDown(elem, y): void {
    setTimeout(() => { elem.scrollTo({ top: elem.scrollTop + y, left: 0, behavior: 'smooth' }); setTimeout(() => { that.loadMore.messages = true; }, 500); }, 300);
  }

  /**
   * @description Detect scroll direction. Returns true if down or false.
   */
  isScrollDown(elem) {
    let st = elem.scrollTop;
    let type = st > this.lastScrollTop ? true : false;
    this.lastScrollTop = st <= 0 ? 0 : st;
    return type;
  }

  public loadChats(event: any): void {
    // console.log(event);
  }

  public loadMessages(event: any): void {
    /**
     * @description Passes the Query with auth for messages.
     */
    if(this.loadMore.messages && !this.isScrollDown(this.messageListElem)) {
      /**
       * @description blocks the event for some time.
       */
      this.loadMore.messages = false;
      /**
       * @description loads the message after 1.5 seconds.
       */
      let auth = Object.assign({}, this.store.cookieString());
      this.socket.emit('findLimitedMessage',
        Object.assign({ message: { query: { cid: this.chat.id }, option: { sort: -1, skip: this.messages.length, limit: 10 } } }, auth)
      );
    }
  }

  /**
   * @description Hide the messages view section.
   */
  public hideMessages() {
    this.createView = this.chatView = this.quickText = this.messageLoader = false;
    this.messages = [];
  }

  /**
   * @description Changes the quick text option.
   */
  public alterQuickText() {
    this.quickText = !this.quickText;
  }

  /**
   * @description show messages when user clicks on an individual chat.
   */
  public showItsMessages(c): void {
    this.chat = c; this.messages = this.chat.messages;
    this.chatView = this.messageLoader = true; this.createView = false;
    /**
     * @description stop initial loading of messages.
     */
    this.lastScrollTop = -1;
    /**
     * @description scroll to bottom of the messages.
     */
    this.scrollToBottom();
    /**
     * @description do not fetch messages when already have some.
     */
    if(this.messages.length) { this.messageLoader = false; return; }
    /**
     * @description Passes the Query with auth for messages.
     */
    let auth = Object.assign({}, this.store.cookieString());
    this.socket.emit('findLimitedMessage',
      Object.assign({ message: { query: { cid: this.chat.id }, option: { sort: -1, skip: this.messages.length, limit: 10 } } }, auth)
    );
  }

  /**
   * @description confirms the key events.
   */
  public keyDown(event: KeyboardEvent) {
    if(event.keyCode === 13 && !event.shiftKey) { event.preventDefault(); return; }
  }

  /**
   * @description sends the typing response or the text to the recipients.
   */
  public keyUp(event: KeyboardEvent) {
    if(event.keyCode === 13 && !event.shiftKey) { console.log('Sending the text...'); return; }
    /**
     * @description shows the typing message.
     */
    this.showTyping();
  }

  /**
   * @description Sends show typing text.
   */
  private showTyping() {
    if(!this.text.value.length) { return false; }

    let t = _.split(this.text.value, '\n').join('<br>');
    /**
     * @description Passes the Query with auth for messages.
     */
    let auth = Object.assign({}, this.store.cookieString());
    this.socket.emit('typing', 
      Object.assign({ message: { query: { cid: this.chat.id, text: t, createdBy: { email: this.user.email, fullName: this.user.fullName } } } }, auth)
    );
  }

  /**
   * @description Sends the current message.
   */
  public sendThis() {
    if(!this.text.value.length) { return false; }

    let t = _.split(this.text.value, '\n').join('<br>');
    /**
     * @description Passes the Query with auth for messages.
     */
    let auth = Object.assign({}, this.store.cookieString());
    this.socket.emit('text', 
      Object.assign({ message: { query: { cid: this.chat.id, text: t, createdBy: { email: this.user.email, fullName: this.user.fullName } } } }, auth)
    );

    this.text.setValue('');
  }

  /**
   * @description open create chat modal.
   */
  public visitCreate() {
    this.createView = !this.createView;
  }

  /**
   * @description search for the users.
   */
  public searchUsers(event: KeyboardEvent) {
    /**
     * @description Minimum 3 letters (without any space) are required for the search.
     */
    let v = this.searchInput.value.trim();
    if(v.length < 3) { this.searchedUsers = []; return false; }
    /**
     * @description Passes the Query with auth for messages.
     */
    let auth = Object.assign({}, this.store.cookieString());
    this.socket.emit('search', 
      Object.assign({ message: { query: { text: v } } }, auth)
    );

  }

  /**
   * @description creates a chat for the user when the chat does not extsts.
   */
  public createChat(event: any) {
    if(!this.selectedUsers.length || (!this.createChatForm.valid && this.selectedUsers.length > 1)) { this.openSnackBar('Please choose user(s) and group name!', ''); return; }
    /**
     * @description stores the fullName as required.
     */
    if(this.selectedUsers.length === 1) {
      this.createChatForm.setValue({ fullName: '' });
      /**
       * @description find is the chat already exists.
       */
      let ec = _.find(this.chats, (o) => { if(!o.type) { return _.find(o.users, (tu) => { return tu.email === this.selectedUsers[0]['email']; }) != undefined; } });
      /**
       * @description select from available messages.
       */
      if(ec) { this.showItsMessages(ec); return; }
    }
    /**
     * @description generates the request parameters.
     */
    let ch = Object.assign({}, this.createChatForm.value, { users: this.selectedUsers });
    /**
     * @description Passes the Query with auth for a new chat.
     */
    let auth = Object.assign({}, this.store.cookieString());
    this.socket.emit('chat',
      Object.assign({ message: { query: ch } }, auth)
    );
  }

  /**
   * @description response from socket server with user details.
   */
  private onUser(res) {
    that.user = res;
  }

  /**
   * @description response from socket server with chat details.
   */
  private onChats(res) {
    that.chats = res.data;
    /**
     * @description hide the chat loader.
     */
    that.chatLoader = false;
  }

  private onCPacket(res) {
    /**
     * @description push the new chat.
     */
    that.chats.push(res.chat.data);
    /**
     * @description show its messages when user has created the chat.
     */
    if(that.user.email === res.chat.data.admin.email) { that.showItsMessages(res.chat.data); }
    /**
     * @description Passes the Query with auth for join.
     */
    let auth = Object.assign({}, that.store.cookieString());
    that.socket.emit('join',
      Object.assign({ message: { room: res.room } }, auth)
    );
  }

  /**
   * @description response from socket server with messages.
   */
  private onMessages(res) {
    /**
     * @description hide the loader when message is loaded. And enables the load more event.
     */
    that.messageLoader = false;
    /**
     * @description stops execution when no data found.
     */
    if(!res.data.length) { that.scrollYDown(that.messageListElem, 20); return true; }
    /**
     * @description insert messages in proper order.
     */
    let c = _.find(that.chats, { 'id': res.data[0].cid });
    let m = _.concat(res.data, c['messages']);
    that.messages = c['messages'] = m;
    /**
     * @description scroll to bottom of the messages.
     */
    if(that.messages.length <= 10) { that.scrollToBottom(); }
    else { that.scrollYDown(that.messageListElem, 20); }
  }

  /**
   * @description when user sends or receives a text.
   */
  private onTexted(res) {
    let c = _.find(that.chats, { 'id': res.lastMessage.cid });
    c['lastMessage'] = res.lastMessage;
    c['messages'].push(res.lastMessage);
    /**
     * @description scroll to bottom after chat is loaded.
     */
    that.scrollToBottom();
  }

  private onPacket(res) {
    if(res.error) { that.searchedUsers = []; return false; }
    /**
     * @description store packets into the searchedUsers
     */
    let ur = _.map(res.data, (r) => { return Object.assign({}, r, { 'selected': false }); });
    /**
     * @description filter the selcted users on search list.
     */
    _.forEach(ur, (u) => {
      let tu = _.find(that.selectedUsers, ['email', u.email]);
      if(tu) { u.selected = tu.selected; }
    });
    that.searchedUsers = ur;
  }

  /**
   * @description handles the is typing operation here.
   */
  public isTyping = {
    show: false,
    lastMessage: { cid: '', createdBy: { email: '', fullName: '' }, text: '' }
  };

  private onTyping(res) {
    let c = _.find(that.chats, { 'id': res.lastMessage.cid });
    c['isTyping'] = { show: true, lastMessage: res.lastMessage };
    /**
     * @description when typing the message.
     */
    that.isTyping = c['isTyping'];
  }

  /**
   * @description all the selected user list will be stored here.
   */
  public selectedUsers = [];
  /**
   * @description form fields and validations are done here.
   */
  public groupFullName = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.groupName ]);
  private createChatForm = new FormGroup({
    fullName: this.groupFullName
  });

  alterSelected(u: any): void {
    /**
     * @description store the user or remove.
     */
    if(u.selected) { this.selectedUsers.push(u); }
    else { this.remove(u); }
  }

  /**
   * @description remove user from the selected users.
   */
  remove(u: any): void {
    _.remove(this.selectedUsers, (o) => { return o.email === u.email; });
    let tu = _.find(this.searchedUsers, ['email', u.email]);
    if(tu) { tu.selected = false; }
  }

  /**
   * @description opens the snack bar when required.
   * @param message the string that is to be shown.
   * @param action supporting message when required.
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
      duration: 3000,
    });
  }
}
