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
  private user: string = 'ps-u-a-p';
  private token: string = 'ps-t-a-p';

  constructor(private store: StoreService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    let isLoggedinExp = /^\/dashboard/gm;

    /**
     * @description Use this for testing. Allows to route without any guard.
     */
    // return true;
    
    if(url === '/') {
      return this.shouldLogin(url);
    } else if(isLoggedinExp.test(url)) {
      return this.isLoggedin(url);
    } else {
      return true;
    }
  }

  /**
   * @description if already logged in then navigate to dashboard.
   */
  shouldLogin(url: string): boolean {
    let auth = {
      username: this.store.getCookie(this.user),
      token: this.store.getCookie(this.token)
    };
    if(auth.username.length && auth.token.length) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  /**
   * @description if not logged in then navigate to root
   */
  isLoggedin(url: string): boolean {
    let auth = {
      username: this.store.getCookie(this.user),
      token: this.store.getCookie(this.token)
    };
    if(auth.username.length && auth.token.length) { return true; }
    this.router.navigate(['/']);
    return false;
  }
}
