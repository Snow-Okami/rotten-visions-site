import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Socket } from 'ngx-socket-io';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

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

  public user = { firstName: '', email: '' };

  private progressBar;
  public config: PerfectScrollbarConfigInterface = { };
  @ViewChild('chatList') chatList?: PerfectScrollbarComponent;
  @ViewChild('messageList') messageList?: PerfectScrollbarComponent;

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

  private onUser(res) {
    that.user = res;
  }

  private onChats(res) {
    if(res.error) { return false; }
    that.chats = res.data;

    console.log(that.user);
  }

}
