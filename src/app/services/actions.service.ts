import { Injectable, Component, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SnackbarComponent } from '../components/snackbar/snackbar.component';

import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private snackBarRef: any;

  constructor(
    public snackBar: MatSnackBar,
    private store: StoreService
  ) { }

  openSnackBar(message: string, action: string) {
    this.store.snackBarRef = this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
      duration: 10000,
    });
  }

  openSnackBarComponent(message: string, status: string, option?: any) {
    this.store.snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, Object.assign({
      data: {
        message: message,
        status: status
      },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
      duration: 10000
    }, option));
  }

  async getBoundingClientRect(elem: ElementRef) {
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {if(elem) { clearInterval(timer); resolve(elem.nativeElement.getBoundingClientRect()); }}, 500);
    });
  }

  /**
   * @param d number in seconds
   */
  async wait(d: number) {
    return new Promise((res, rej) => {
      setTimeout(() => { res(true); }, d * 1000);
    });
  }

  public copyToClipboard(str: string) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.openSnackBarComponent('Data is copied to clipboard', 'success');
  };
}
