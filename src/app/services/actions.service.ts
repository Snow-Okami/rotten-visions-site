import { Injectable, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(
    public snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
      duration: 10000,
    });
  }

  openSnackBarComponent(message: string, status: string, option?: any) {
    this.snackBar.openFromComponent(SnackbarComponent, Object.assign({
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