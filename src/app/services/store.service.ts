import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private messageSource = new BehaviorSubject('');
  public currentMessage = this.messageSource.asObservable();

  public searchElemConfig: any = {
    pos: {
      from: { x: 0, scale: 0 },
      to: { x: 0, scale: 1 },
    },
    open: true,
    initialized: false
  };

  constructor(
    private snackBar: MatSnackBar
  ) { }

  setCookie(cname: any, cvalue: any, exdays: any) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  getCookie(cname: any) {
    var name = cname + '=';
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
    return '';
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  openSnackBar(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action ? action : '', {
      duration: duration ? duration : 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
    });
  }

  public isDevice = {
    Android: navigator.userAgent.match(/Android/i) || false,
    BlackBerry: navigator.userAgent.match(/BlackBerry/i) || false,
    iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i) || false,
    Opera: navigator.userAgent.match(/Opera Mini/i) || false,
    Windows: navigator.userAgent.match(/IEMobile/i) || false,
    Macintosh: navigator.userAgent.match(/Macintosh/i) || false
  };
}
