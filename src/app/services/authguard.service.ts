import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';
import { StoreService } from './store.service'

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  private user: string = 'angular-start-user';
  private token: string = 'angular-start-token';

  constructor(private store: StoreService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    if(url === '/app') {
      return this.isLoggedin(url);
    } else if(url === '/login') {
      return this.shouldLogin(url);
    } else {
      return true;
    }
  }

  /**
   * @description if already logged in then navigate to /app.
   */
  shouldLogin(url: string): boolean {
    let auth = {
      username: this.store.getCookie(this.user),
      token: this.store.getCookie(this.token)
    };
    if(auth.username.length && auth.token.length) {
      this.router.navigate(['/app']);
      return false;
    }
    return true;
  }

  /**
   * @description if not logged in then navigate to /login
   */
  isLoggedin(url: string): boolean {
    let auth = {
      username: this.store.getCookie(this.user),
      token: this.store.getCookie(this.token)
    };
    if(auth.username.length && auth.token.length) { return true; }
    this.router.navigate(['/login']);
    return false;
  }
}
