import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';
import { StoreService } from './store.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  private user: string = 'ps-u-a-p';
  private token: string = 'ps-t-a-p';

  constructor(private store: StoreService, private router: Router, private http: HttpService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    let url: string = state.url;
    let isLoggedinExp = /^\/dashboard/gm;

    /**
     * @description async guard for token authentication.
     */
    return this.wait(url, isLoggedinExp);

    /**
     * @description Use this for testing. Allows to route without any guard.
     */
    // return true;

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzZWsuZHV0dGEuNTA3QGdtYWlsLmNvbSIsImFsbG93ZWRUb0FjY2VzcyI6dHJ1ZSwiand0VmFsaWRhdGVkQXQiOiIyMDE5LTA0LTA5VDExOjUwOjQ3LjIxNVoiLCJjYXBhYmlsaXR5IjoyLCJpYXQiOjE1ODYwNjgzODMsImV4cCI6MTU4NjI0ODM4M30.CDueAB7P4zowmLJ3aROru6yqbL2GFSHaC5vkCW-1lnk
  }

  /**
   * @description if already logged in then navigate to dashboard.
   */
  shouldLogin(user: any): boolean {
    if(user.type === 'success') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  /**
   * @description if not logged in then navigate to root
   */
  isLoggedin(user: any): boolean {
    if(user.type === 'success') { return true; }
    this.router.navigate(['/']);
    return false;
  }

  /**
   * @description perform the async operations in it.
   * @param url 
   * @param isLoggedinExp 
   */
  wait(url: string, isLoggedinExp: any): Promise<boolean> {
    return new Promise(async (next) => {
      let auth = {
        username: atob(this.store.getCookie(this.user)),
        token: this.store.getCookie(this.token)
      };
      let tR: any = await this.http.user(auth.username).toPromise().catch(e => {next(false);});
      tR.message.type === 'success' && (this.store.user = {
        data: tR.data,
        synced: true
      });

      if(url === '/') {
        next(this.shouldLogin(tR.message));
      } else if(isLoggedinExp.test(url)) {
        next(this.isLoggedin(tR.message));
      } else {
        next(true);
      }
    });
  }
}
