import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
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
  public quickText = false;
  public messages = [];

  public chat = {
    users: [{ fullName: 'Recipient Name', email: 'recipient@example.com' }]
  };
  public user = { firstName: 'User', fullName: 'User Name', email: 'user@example.com' };

  private progressBar;
  public config: PerfectScrollbarConfigInterface = { };
  @ViewChild('chatList') chatList?: PerfectScrollbarComponent;
  @ViewChild('messageList') messageList?: PerfectScrollbarComponent;

  public text = new FormControl({ value: '', disabled: false }, []);

  constructor(
    private socket: Socket,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private http: HttpService,
    private store: StoreService
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
    this.socket.on('user', this.onUser);
    this.socket.on('chats', this.onChats);
    this.socket.on('messages', this.onMessages);
  }

  ngAfterViewInit() {

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

    let auth = Object.assign({}, this.store.cookieString());
    this.socket.emit('login', auth);

    this.scrollToBottom();
  }

  public scrollToBottom(): void {
    this.messageList.directiveRef.scrollToBottom();
  }

  public onScrollEvent(event: any): void {
    // console.log(event);
  }

  public hideMessages() {
    this.chatView = this.quickText = false;
  }

  public alterQuickText() {
    this.quickText = !this.quickText;
  }

  public showItsMessages(c): void {
    this.chat = c;
    let auth = Object.assign({}, this.store.cookieString());
    this.socket.emit('findLimitedMessage',
      Object.assign({ message: { query: { cid: c.cid }, option: { sort: -1, skip: 0, limit: 10 } } }, auth)
    );
  }

  public sendThis() {
    if(!this.text.value.length) { return false; }

    let t_a = _.map(_.split(this.text.value, '\n'), (o) => {
      return o === '' ? '<br>' : `<p> ${o} </p>`;
    });
    let t = _.join(t_a, '');

    let auth = Object.assign({}, this.store.cookieString());
    this.socket.emit('ping', auth);
    console.log(t, this.chat);
  }

  private onUser(res) {
    that.user = res;
  }

  private onChats(res) {
    that.chats = res.data;
  }

  private onMessages(res) {
    that.messages = res.data;
    that.chatView = true;
  }

}
