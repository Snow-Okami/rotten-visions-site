import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  /**
   * @description version is the app version.
   */
  public version: string = '2.9.9';
  public update: boolean = false;

  constructor(
    public appUpdate: SwUpdate,
    public snackBar: MatSnackBar
  ) {
    this.appUpdate.available.subscribe(e => { this.update = true; });
  }

  updateApplication() {
    this.appUpdate.activateUpdate().then(() => document.location.reload());
  }

  updatedMessage() { this.openSnackBar('Application is updated!', ''); }

  ngOnInit() { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
      duration: 3000,
    });
  }

}
