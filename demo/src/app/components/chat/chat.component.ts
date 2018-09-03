import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
