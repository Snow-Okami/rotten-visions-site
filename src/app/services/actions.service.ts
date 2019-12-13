import { Injectable, Component, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SnackbarComponent } from '../components/snackbar/snackbar.component';

import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private snackBarRef: any;

  constructor(
    public snackBar: MatSnackBar,
    private store: StoreService
  ) { }

  async getBoundingClientRect(elem: ElementRef) {
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {if(elem) { clearInterval(timer); resolve(elem.nativeElement.getBoundingClientRect()); }}, 500);
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
}
