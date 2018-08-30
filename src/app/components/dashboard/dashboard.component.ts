import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [HttpService]
})
export class DashboardComponent implements OnInit {

  auth = {
    user: '',
    password: '',
    emaillogin: false
  };

  message = {
    text: "What's up! I'm from dashboard",
    to: "abhisek507"
  }

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  login() {
    this.http.login(this.auth)
    .subscribe(message => console.log(message));
  }

  send() {
    this.http.sendMessage(this.message)
    .subscribe(message => console.log(message));
  }

}
