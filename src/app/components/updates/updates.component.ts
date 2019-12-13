import { Component, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

let that: any;

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({ overflow: 'hidden' })),
      state('closed', style({ height: '0px', overflow: 'hidden' })),
      transition('open => closed', [ animate('0.4s') ]),
      transition('closed => open', [ animate('1s') ]),
    ])
  ]
})
export class UpdatesComponent implements OnInit {

  public title = 'Rottenvision | Updates';
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
  @ViewChild('loadScroll', { static: false }) loadScroll: any;
  @ViewChild('fixedBottom', { static: false }) fixedBottom: any;

  public imgHeight: any;
  public window: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public store: StoreService,
    private http: HttpService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.window = window;
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
    /**
     * @description Added window resize event.
     */
    this.window.addEventListener('resize', this.isResizing);
    /**
     * @description Set custom image height
     */
    this.imgHeight = this.mobileQuery.matches ? ((this.window.innerWidth - 32) / 16) * 9 : '198';
  }

  isResizing(e: any) {
    /**
     * @description Set custom image height
     */
    that.imgHeight = that.mobileQuery.matches ? ((that.window.innerWidth - 32) / 16) * 9 : '198';
  }

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
  onScrollDown(e: any) {
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
    this.window.removeEventListener('resize', this.isResizing);
  }

  showRouteProgress(e: any) {
    let classList = e.target.parentNode.classList.value.split(' ');
    if(!classList.includes('active')) {
      document.getElementsByClassName('route-progress-bar')[0].classList.remove('hidden');
    }
  }

  fixPostLen(value: any, args: any) {
    let v = value.length > args ? value.slice(0, args) + '...' : value;
    return v;
  }

}
