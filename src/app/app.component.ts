import { Component, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { environment } from '../environments/environment';

let that: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('movie') movie: any;
  private preloadImages = {
    cache: []
  };
  // public cookiePopup = environment.production;
  constructor() {
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
  /**
   * @description play the video manually
   */
  // playMovie() {
  //   this.movie.nativeElement.play();
  //   this.cookiePopup = false;
  // }

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
