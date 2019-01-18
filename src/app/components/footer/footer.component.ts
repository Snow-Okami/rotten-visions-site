import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  /**
   * @description version is the app version.
   */
  public version: string = '3.0.1';
  public update: boolean = false;

  constructor(
    public appUpdate: SwUpdate,
    public snackBar: MatSnackBar
  ) {
    this.appUpdate.available.subscribe(e => { this.update = true; });
  }

  updateApplication() {
    if(environment.production) {
      this.appUpdate.activateUpdate().then(() => {
        navigator.serviceWorker.getRegistration().then((sw) => {
          sw.unregister(); document.location.reload();
        });
      });
    }
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
