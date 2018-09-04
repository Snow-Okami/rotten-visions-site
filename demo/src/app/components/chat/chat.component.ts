import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { StoreService } from '../../services/store.service';
import { HttpService } from '../../services/http.service';
import { SocketService } from '../../services/socket.service';

let that;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public msgview = false;
  public user = {
    fname: '',
    lname: ''
  };

  constructor(private socket: Socket, private store: StoreService, private http: HttpService, private socketio: SocketService) { }

  ngOnInit() {
    that = this;

    this.socket.emit('login', 'Hello!');
  }

}
