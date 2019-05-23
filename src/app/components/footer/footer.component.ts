import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { environment } from '../../../environments/environment';

import { ActionsService } from '../../services/actions.service';
import { StoreService } from '../../services/store.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  /**
   * @description version is the app version.
   */
  public version: string = '1.1.3';
  public update: boolean = false;

  constructor(
    private action: ActionsService,
    public appUpdate: SwUpdate,
    private http: HttpService,
    private store: StoreService
  ) {
    // this.appUpdate.available.subscribe(e => { this.update = true; });
    this.checkForUpdate();
  }

  updateApplication() {
    if(environment.production) {
      this.appUpdate.activateUpdate().then(()=>{navigator.serviceWorker.getRegistration().then((sw)=>{sw.unregister();document.location.reload();});});
    }
  }

  updatedMessage() { this.action.openSnackBarComponent('Psynapsus is updated!', ''); }

  ngOnInit() {
    
  }

  async checkForUpdate() {
    let v = await this.http.getVersion({}).toPromise();
    if(v['message']['type'] !== 'error') {
      if(v['data']['clientLatest'] !== this.version) { this.store.update.data = v['data']; this.store.update.synced = true; this.update = true; }
    }
  }

}
