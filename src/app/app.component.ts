import { Component, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import * as _ from 'lodash';

import { ActionsService } from './services/actions.service';
import { StoreService } from './services/store.service';
import { environment } from '../environments/environment';

let that: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public update: boolean = false;
  private preloadImages = {
    cache: []
  };
  public url = environment.production ? 'https://psynapsus.appspot.com/embed/rottenvisions-bgv.html' : 'http://localhost:5000/embed/rottenvisions-bgv.html';
  constructor(
    private action: ActionsService,
    public store: StoreService,
    public appUpdate: SwUpdate
  ) {
    that = this;
    this.cacheImages();
  }

  ngOnInit() {
    this.appUpdate.available.subscribe(e => {
      that.update = true;
      this.action.openSnackBarComponent('App has an update!', '');
    });
  }

  ngOnDestroy() {}

  ngOnChanges() {}

  ngDoCheck() {}

  ngAfterContentInit() {}

  ngAfterContentChecked() {}

  ngAfterViewInit() {}

  ngAfterViewChecked() {}

  /**
   * 
   * @param c is the child route component. All available variables and funtions will be returned.
   */
  routeChange(c: any) {}

  cacheImages() {
    if(!this.preloadImages.cache.length) {
      let images = [
        '/assets/icon/white-bg.png',
        '/assets/icon/red-bg.png',
        '/assets/icon/Home.png',
        '/assets/icon/About.png',
        '/assets/icon/Projects.png',
        '/assets/icon/Updates.png',
        '/assets/icon/Contact.png',
        '/assets/logo/small-logo.png'
      ], image;
      _.forEach(images, (url, index) => {
        image = new Image();
        image.src = url;
        this.preloadImages.cache.push(image);
      });
    }
  }

  updateApplication() {
    if(environment.production) {
      this.appUpdate.activateUpdate().then(()=>{navigator.serviceWorker.getRegistration().then((sw)=>{sw.unregister();document.location.reload();});});
    }
  }

}
