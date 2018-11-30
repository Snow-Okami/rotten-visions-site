import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Socket } from 'ngx-socket-io';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

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
  @ViewChild(PerfectScrollbarComponent) chatRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarComponent) messageRef?: PerfectScrollbarComponent;

  constructor(
    private socket: Socket,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  ngAfterViewInit() {

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

    this.socket.emit('login');

    console.log(this.chatRef, this.messageRef);
    // this.scrollToBottom();
  }

  public scrollToBottom(): void {
    this.messageRef.directiveRef.scrollToBottom();
  }

  public onScrollEvent(event: any): void {
    console.log(event);
  }

}
