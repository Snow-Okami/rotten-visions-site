import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

import { User } from '../../interfaces/user';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

let that: any;

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
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
  private progressBar: any;
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
  private mc: any;

  @ViewChild('loadScroll') loadScroll: any;
  @ViewChild('fixedBottom') fixedBottom: any;

  private content: any;

  private user: User;

  public createButton: boolean = false;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private router: Router,
    private http: HttpService,
    private store: StoreService,
    public sanitizer: DomSanitizer
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  private _mobileQueryListener: () => void;

  public imgHeight: any;
  public window: any;

  ngOnInit() {
    this.window = window;
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    /**
     * @description Load Available Updates (Max 10)
     */
    this.loadMore();
  }

  async ngAfterContentInit() {
    this.user = this.store.user.data;
    let r: any;

    if(!this.store.user.synced) {
      let email = atob(this.store.getCookie('ps-u-a-p'));
      r = await this.http.user(email).toPromise();
      if(r['message']['type'] !== 'error') { this.user = r['data']; }
    }

    if(this.user.capability === 2) {
      this.createButton = true;
    }
  }

  ngAfterViewInit() {
    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

    // this.content = this.mobileQuery.matches ? window : document.getElementsByClassName('mat-sidenav-content')[0];
    this.content = window;
    this.content.addEventListener('scroll', this.onScrollDown, false);
    /**
     * @description Added window resize event.
     */
    this.window.addEventListener('resize', this.isResizing);
    /**
     * @description Set custom image height
     */
    this.imgHeight = this.mobileQuery.matches ? ((this.window.innerWidth - 32) / 16) * 9 : '198';
  }

  ngOnDestroy() {
    this.content.removeEventListener('scroll', this.onScrollDown);
    this.window.removeEventListener('resize', this.isResizing);
  }

  visitCreate() {
    /**
     * @description Show Progress Bar When Page is Loading.
     */
    this.progressBar.classList.remove('hidden');

    this.router.navigate(['/dashboard/updates/create']);
  }

  editThisUpdate(id: string) {
    if(this.user.capability !== 2) { return; }
    /**
     * @description Show Progress Bar When Page is Loading.
     */
    this.progressBar.classList.remove('hidden');

    this.router.navigate(['/dashboard/updates/edit/' + id]);
  }

  viewThisUpdate(id: string) {
    this.progressBar.classList.remove('hidden');
    this.router.navigate(['/dashboard/updates/view/' + id]);
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
  isScrollDown(): boolean {
    let st = this.content.scrollY || document.documentElement.scrollTop;
    let type = st > this.lastScrollTop;
    this.lastScrollTop = st <= 0 ? 0 : st;
    return type;
  }

  /**
   * @description On scroll this event gets fired.
   */
  onScrollDown(e: any) {
    /**
     * @description wh is scrollable content height
     * eb is element's bottom
     */
    // let wh = that.mobileQuery.matches ? that.content.innerHeight : that.content.getBoundingClientRect().bottom
    let wh = that.content.innerHeight
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
      // let wh = this.mobileQuery.matches ? this.content.innerHeight : this.content.getBoundingClientRect().bottom
      let wh = that.content.innerHeight
      , eb = this.fixedBottom.nativeElement.getBoundingClientRect().top;
      if(wh > eb) {
        let option = {
          // top:  (that.mobileQuery.matches ? this.content.scrollY : this.content.scrollTop) - (wh - eb),
          top:  this.content.scrollY - (wh - eb),
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

  fixPostLen(value: any, args: any) {
    let v = value.length > args ? value.slice(0, args) + '...' : value;
    return v;
  }

}
