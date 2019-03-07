import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private title = 'Psynapsus - Admin Panel';
  public mobileQuery: MediaQueryList;

  /**
   * @description Cache Image Files.
   */
  private preloadImages = {
    cache: []
  };

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.cacheImages();
  }

  ngOnInit() {
    if(this.mobileQuery.matches) {
      document.getElementsByTagName('body')[0].classList.add('mobile-view');
    }
  }

  ngAfterViewInit() { }

  private _mobileQueryListener: () => void;

  /**
   * 
   * @param c is the child route component. All available variables and funtions will be returned.
   */
  routeChange(c: any) {
    document.title = c.title ? c.title : this.title;
  }

  cacheImages() {
    if(!this.preloadImages.cache.length) {
      let images = [
        /**
         * @description Navigation & Page Background
         */
        '/assets/background/theme.png',
        '/assets/logo/Onimind_Logo.png',
        '/assets/background/white-bg.png',
        '/assets/background/red-bg.png',

        /**
         * @description Important For Page Fast Loading
         */
        '/assets/logo/img-ex-light.png',
        '/assets/logo/img.png',
        '/assets/logo/close.png',
        '/assets/logo/404.png',
      ], image: any;

      /**
       * @description Cache Image Files
       */
      _.forEach(images, (url: string, index: number) => {
        image = new Image();
        image.src = url;
        this.preloadImages.cache.push(image);
      });
    }
  }
}
