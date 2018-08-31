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

      this.setCookie('r-v-token', resp['token'], 1);
    });
  }

  send() {
    this.http.sendMessage(this.message)
    .subscribe(message => console.log(message));
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

}
