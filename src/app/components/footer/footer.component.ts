import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

import { environment } from '../../../environments/environment';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  /**
   * @description version is the app version.
   */
  public version: string = '3.0.2';
  public update: boolean = false;

  constructor(
    public appUpdate: SwUpdate,
    public snackBar: MatSnackBar,
    private http: HttpService
  ) {
    this.appUpdate.available.subscribe(e => { this.update = true; });
    this.checkForUpdate();
  }

  updateApplication() {
    if(environment.production) {
      this.appUpdate.activateUpdate().then(()=>{navigator.serviceWorker.getRegistration().then((sw)=>{sw.unregister();document.location.reload();});});
    }
  }

  updatedMessage() { this.openSnackBar('Application is updated!', ''); }

  ngOnInit() {
    
  }

  async checkForUpdate() {
    let v = await this.http.getVersion({}).toPromise();
    if(v['message']['type'] !== 'error') {
      if(v['data']['clientLatest'] !== this.version) { console.log('update available.'); /* this.update = true; */ }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
      duration: 3000,
    });
  }

}
