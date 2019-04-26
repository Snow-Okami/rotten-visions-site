import { Component, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { StoreService } from './services/store.service';
import { environment } from '../environments/environment';

let that: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private preloadImages = {
    cache: []
  };
  public url = environment.production ? 'https://psynapsus.herokuapp.com/embed/rottenvisions-bgv.html' : 'http://localhost:5000/embed/rottenvisions-bgv.html';
  constructor(
    public store: StoreService
  ) {
    that = this;
    this.cacheImages();
  }

  ngOnInit() {}

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

}
