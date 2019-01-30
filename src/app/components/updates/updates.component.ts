import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

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
  public image = {
    offset: 100,
    defaultImage: '/assets/logo/small-logo.png'
  };
  public postList = [];
  public searchText = '';
  public progressBar = true;
  @ViewChild('loadScroll') loadScroll: any;
  @ViewChild('fixedBottom') fixedBottom: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: StoreService,
    private http: HttpService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;

    // this.postList = Object.assign([], this.array);
  }

  ngOnInit() {
    this.store.currentMessage.subscribe(text => this.searchText = text);
    
    /**
     * @description SHOW Progress bar and load Updates.
     */
    this.progressBar = true;
    this.loadMore();
  }

  ngAfterViewInit() {
    document.getElementsByClassName('route-progress-bar')[0].classList.add('hidden');
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
    let wh = window.innerHeight, eb = that.loadScroll.nativeElement.getBoundingClientRect().top;
    if(that.isScrollDown() && wh >= eb) {
      window.removeEventListener('scroll', that.onScrollDown);
      
      /**
       * @description SHOW Progress bar and load Updates.
       */
      that.progressBar = true;
      that.loadMore();
    }
  }

  /**
   * @description Fix & Attach Scroll Event.
   */
  setScroll() {
    // eb > window.innerHeight ? eb - window.innerHeight

    setTimeout(() => {
      /**
       * @description SCROLL to a better position.
       */
      let eb = this.fixedBottom.nativeElement.getBoundingClientRect().top;
      if(window.innerHeight > eb) {
        window.scrollTo({
          top:  window.scrollY - (window.innerHeight - eb),
          left: 0,
          behavior: 'smooth'
        });
      }

      /**
       * @description Attach Scroll Event Again.
       */
      setTimeout(() => {
        window.addEventListener('scroll', this.onScrollDown, false);
      }, 500);
    }, 10);
  }

  /**
   * @description Loads data after scroll ends.
   */
  loadMore() {

    /**
     * @description SET UP skip, limit & sort options here.
     */
    let option = {
      skip: this.postList.length
    };

    this.http.posts(option)
    .subscribe(resp => {
      if(resp['message']['type'] !== 'error') {
        this.postList = _.concat(this.postList, Object.assign([], resp['data']));
      } else { }

      /**
       * @description Hide Progress Bar When Page is Loaded.
       */
      this.progressBar = false;
      // attach a scroll event to scroll at least 20px from bottom to top.

      if(option.skip) {
        this.setScroll();
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', that.onScrollDown);
  }

}

