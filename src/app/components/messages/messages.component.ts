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
    this.progressBar = document.getElementsByClassName('progressbar')[0];
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

}
