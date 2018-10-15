import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private messageSource = new BehaviorSubject('');
  public currentMessage = this.messageSource.asObservable();

  constructor() { }

  /**
   * @description message passing service between Components.
   * @param message string to be passed to component(Parent or Child).
   */
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  /**
   * 
   * @param cname cookie name to be set.
   * @param cvalue cookie value to be set.
   * @param exdays cookie validity to be set.
   */
  setCookie(cname: string, cvalue: string, exdays: number) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  /**
   * 
   * @param cname cooke to be get using name.
   */
  getCookie(cname: string) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
