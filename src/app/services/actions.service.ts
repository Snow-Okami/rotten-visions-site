import { Injectable, Component, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private snackBarRef: any;

  constructor(
    public snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBarRef = this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
      duration: 10000,
    });
  }

  openSnackBarComponent(message: string, status: string, option?: any) {
    this.snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, Object.assign({
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

  closeSnackBar() {
    this.snackBarRef.dismiss();
  }

  async getBoundingClientRect(elem: ElementRef) {
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {if(elem) { clearInterval(timer); resolve(elem.nativeElement.getBoundingClientRect()); }}, 500);
    });
  }
}
