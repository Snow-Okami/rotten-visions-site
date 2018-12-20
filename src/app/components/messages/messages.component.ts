import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { Socket } from 'ngx-socket-io';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import * as _ from 'lodash';

import { StoreService } from '../../services/store.service';
import { HttpService } from '../../services/http.service';

let that;

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
  public typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
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
  public searchUsers(event: any) {
    console.log(event, 'triggered');
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

  /**
   * @description response from socket server with messages.
   */
  private onMessages(res) {
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
     * @description hide the loader when message is loaded. And enables the load more event.
     */
    that.messageLoader = false;
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

}
