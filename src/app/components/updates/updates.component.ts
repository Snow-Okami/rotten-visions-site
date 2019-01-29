import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';
import { text } from '@angular/core/src/render3';

let that;

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Updates Dashboard';
  /**
   * @description data to be received by the dashboard.
   */
  private hideFooter = true;

  /**
   * @description Default Post Image To Be Loaded.
   */
  public image = {
    offset: 100,
    defaultImage: '/assets/logo/img-ex-light.png'
  };

  public mobileQuery: MediaQueryList;
  private progressBar;
  /**
   * @description Update Text Changes As Required Before Or After HTTP Request & Response.
   */
  public updateText = 'Checking for updates...';
  /**
   * @description UPDATES & RECENT Will Have The Update Objects.
   */
  public updates = [];
  public recent = [];
  /**
   * @description Top Scroll Limit Used To Detect Top Scroll.
   */
  private lastScrollTop = 0;
  public loadingBar = true;
  private mc;

  @ViewChild('loadScroll') loadScroll: any;
  @ViewChild('fixedBottom') fixedBottom: any;

  private content: any;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private router: Router,
    private http: HttpService,
    public sanitizer: DomSanitizer
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    /**
     * @description Load Available Updates (Max 10)
     */
    this.loadMore();
  }

  ngAfterViewInit() {
    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

    this.content = this.mobileQuery.matches ? window : document.getElementsByClassName('mat-sidenav-content')[0];
    this.content.addEventListener('scroll', this.onScrollDown, false);
  }

  ngOnDestroy() {
    this.content.removeEventListener('scroll', this.onScrollDown);
  }

  visitCreate() {
    /**
     * @description Show Progress Bar When Page is Loading.
     */
    this.progressBar.classList.remove('hidden');

    this.router.navigate(['/dashboard/updates/create']);
  }

  viewThisUpdate(id: string) {
    /**
     * @description Show Progress Bar When Page is Loading.
     */
    this.progressBar.classList.remove('hidden');

    this.router.navigate(['/dashboard/updates/view/' + id]);
  }

  /**
   * @description Detect scroll direction. Returns true if down or false.
   */
  isScrollDown(): boolean {
    let st = this.content.scrollTop || document.documentElement.scrollTop;
    let type = st > this.lastScrollTop ? true : false;
    this.lastScrollTop = st <= 0 ? 0 : st;
    return type;
  }

  /**
   * @description On scroll this event gets fired.
   */
  onScrollDown(e) {
    /**
     * @description wh is scrollable content height
     * eb is element's bottom
     */
    let wh = that.mobileQuery.matches ? that.content.innerHeight : that.content.getBoundingClientRect().bottom
    , eb = that.loadScroll.nativeElement.getBoundingClientRect().top;
    if(!that.isScrollDown() || eb > wh) { return; }

    that.content.removeEventListener('scroll', that.onScrollDown);
    /**
     * @description SHOW Progress bar and load Updates.
     */
    that.loadMore();
  }

  loadMore() {
    /**
     * @description Show Progress Bar When Loading Updates.
     */
    this.loadingBar = true;

    /**
     * @description SET UP skip, limit & sort options here.
     */
    let option = {
      skip: this.updates.length
    };

    this.http.posts(option)
    .subscribe(resp => {
      if(resp['message']['type'] !== 'error') {
        _.forEach(resp['data'], (i) => {
          i.tags = i.tags ? JSON.parse(i.tags) : [];
        });

        this.updates = _.concat(this.updates, Object.assign([], resp['data']));
      } else {
        /**
         * @description When no updates available.
         */
        this.updateText = 'Sorry! updates not available.';
      }

      /**
       * @description Hide Progress Bar When Page is Loaded.
       */
      this.loadingBar = false;

      if(option.skip) {
        this.setScroll();
      }
    });
  }

  /**
   * @description Fix & Attach Scroll Event.
   */
  setScroll() {

    setTimeout(() => {
      /**
       * @description SCROLL to a better position.
       * @description wh is scrollable content height
       * @description eb is element's bottom
       */
      let wh = this.mobileQuery.matches ? this.content.innerHeight : this.content.getBoundingClientRect().bottom
      , eb = this.fixedBottom.nativeElement.getBoundingClientRect().top;
      if(wh > eb) {
        let option = {
          top:  (that.mobileQuery.matches ? this.content.scrollY : this.content.scrollTop) - (wh - eb),
          left: 0,
          behavior: 'smooth'
        };
        this.content.scrollTo(option);
      }

      /**
       * @description Attach Scroll Event Again.
       */
      setTimeout(() => {
        this.content.addEventListener('scroll', this.onScrollDown, false);
      }, 500);
    }, 10);
  }

  fixPostLen(value, args) {
    let v = value.length > args ? value.slice(0, args) + '...' : value;
    return v;
  }

}
