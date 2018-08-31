import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  constructor(private http: HttpService, private router: Router) { }

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

      this.http.setCookie('r-v-token', resp['token'], 1);
      this.http.setCookie('r-v-user', this.auth['user'], 1);
      this.router.navigate(['/chat']);
    });
  }

  send() {
    this.http.sendMessage(this.message)
    .subscribe(message => console.log(message));
  }

}
