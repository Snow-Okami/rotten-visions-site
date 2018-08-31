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
  };

  headers = {};
  config = {};

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  login() {
    this.http.login(this.auth)
    .subscribe(resp => {
      /* const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);

      // access the body directly, which is typed as `Config`.
      this.config = { ... resp.body };

      console.log(resp, this.headers, this.config); */

      console.log(resp);
    });
  }

  send() {
    this.http.sendMessage(this.message)
    .subscribe(message => console.log(message));
  }

}
