import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }    from '@angular/router';
import { StoreService } from './store.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private store: StoreService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    if(url === '/login') {
      return this.shouldLogin(url);
    }
    return this.isLoggedin(url);
  }

  shouldLogin(url: string): boolean {
    let auth = {
      username: this.store.getCookie('r-v-user'),
      token: this.store.getCookie('r-v-token')
    };
    if(auth.username.length && auth.token.length) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  isLoggedin(url: string): boolean {
    let auth = {
      username: this.store.getCookie('r-v-user'),
      token: this.store.getCookie('r-v-token')
    };
    if(auth.username.length && auth.token.length) { return true; }
    this.router.navigate(['/login']);
    return false;
  }
}
