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
      duration: 6000,
    });
  }

  openSnackBarComponent(message: string, status: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        status: status
      },
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr'
    });
  }
}
