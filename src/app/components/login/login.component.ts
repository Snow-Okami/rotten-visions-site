import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Auth } from '../../classes/auth';
import { StoreService } from '../../services/store.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public auth: Auth = {
    user: '',
    password: '',
    emaillogin: false
  };

  constructor(private store: StoreService, private http: HttpService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.http.login(this.auth)
    .subscribe(resp => {
      if(resp['message']['type'] != 'error') {
        /**
         * @param store.setCookie(name, value, duration in days)
         */
        this.store.setCookie('r-v-token', resp['token'].replace('Bearer ', ''), 1);
        this.store.setCookie('r-v-user', this.auth['user'], 1);
        this.router.navigate(['/chat']);
      } else {
        alert(resp['message']['text']);
      }
    });
  }

}
