import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as _ from 'lodash';

let that;

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent {
  public title = 'Rotten Visions | Updates';
  public mobileQuery: MediaQueryList;
  private lastScrollTop = 0;
  private postLimit = 3;
  public array = Array.from({length: this.postLimit}, (_, i) => `Coming soon...`);
  @ViewChild('loadScroll') loadScroll: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onScrollDown, false);
  }

  private _mobileQueryListener: () => void;

  /**
   * @description Detect scroll direction. Returns true if down or false.
   */
  isScrollDown() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    let type = st > this.lastScrollTop ? true : false;
    this.lastScrollTop = st <= 0 ? 0 : st;
    return type;
  }

  /**
   * @description Function called when scrolled to bottom.
   */
  onScrollDown(e) {
    /**
     * @description wh is window height
     * eb is element's bottom
     */
    let wh = window.innerHeight, eb = that.loadScroll.nativeElement.getBoundingClientRect().top - 80;
    if(that.isScrollDown() && wh >= eb) {
      window.removeEventListener('scroll', that.onScrollDown);
      setTimeout(() => { that.loadMore(); }, 2000);
    }
  }

  /**
   * @description Loads data after scroll ends.
   */
  loadMore() {
    let t = Array.from({length: this.postLimit}, (_, i) => `Coming soon...`);
    this.array = _.concat(this.array, t);
    window.addEventListener('scroll', this.onScrollDown, false);
  }

}

