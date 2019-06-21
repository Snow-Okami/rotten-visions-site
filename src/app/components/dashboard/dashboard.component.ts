import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'lodash';
import 'hammerjs';

import { User } from '../../interfaces/user';

import { ActionsService } from '../../services/actions.service';
import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

let that: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public mobileQuery: MediaQueryList;
  public navList = [
    { nav: 'Profile', url: '/dashboard/profile' },
    { nav: 'Achievements', url: '/dashboard/achievements' },
    { nav: 'Games', url: '/dashboard/games' },
    { nav: 'Messages', url: '/dashboard/messages' },
    { nav: 'Updates', url: '/dashboard/updates' },
    { nav: 'News', url: '/dashboard/news' }
  ];
  private _mobileQueryListener: () => void;

  @ViewChild('snav') sidenav: any;
  @ViewChild('container') container: any;
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Dashboard';

  private content: any;

  private mc: any;
  private panArea = [];
  public finalArea = [];
  private progressBar: any;
  public hideFooter: boolean = false;
  public hideMatToolbar: string = '';

  private user: User;

  constructor(
    private action: ActionsService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: StoreService,
    private http: HttpService,
    private router: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  /**
   * 
   * @param c is the child route component. All available variables and funtions will be returned.
   */
  routeChange(c: any) {
    document.title = c.title ? c.title : this.title;
    this.hideFooter = c.hideFooter ? true : false;
    
    // Show hide nav routes from different users.
    this.validateUrls();
  }

  async validateUrls() {
    this.user = this.store.user.data;
    let r: any;

    if(!this.store.user.synced) {
      let email = atob(this.store.getCookie('ps-u-a-p'));
      r = await this.http.user(email).toPromise();

      if(r['message']['type'] !== 'error') {
        this.store.user.data = this.user = r['data'];
        this.store.user.synced = true;
      } else {
        this.action.openSnackBarComponent(r['message']['text'], 'error'); return;
      }
    }

    if(this.user.capability === 2) {
      /**
       * @description Add updates in the navList.
       */
      let n = _.find(this.navList, ['nav', 'Track Users']);
      if(n === undefined) { this.navList.splice(3, 0, { nav: 'Track Users', url: '/dashboard/track' }); }
    }
  }

  public window: any;

  ngOnInit() {
    this.window = window;
    this.progressBar = document.getElementsByClassName('progressbar')[0];
    /**
     * @description subscribe to store variables.
     */
    this.store.hideMatToolbar.subscribe(text => this.hideMatToolbar = text);
  }

  async ngAfterContentInit() {
    
  }

  ngAfterViewInit() {

    if(this.mobileQuery.matches && this.store.isDevice.Android) {
      /**
       * @description Enable SLIDE to TOGGLE navigation.
       */
      let containerElement = this.container._element.nativeElement;
      let Hammer = this.window.Hammer;
      this.mc = new Hammer.Manager(containerElement);
      this.mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
      this.mc.on("panright", this.onPanRight);
      this.mc.on("panleft", this.onPanLeft);
    }

    /**
     * @description Enable Auto API Test For Inactivity. Tests once in every 20 mins.
     */
    // this.http.test({})
    // .subscribe(resp => {});
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   * @description Event fires when Pan detected on mobile from Left to Right.
   * @param ev is the event captured by hammer js
   */
  onPanRight(ev: any) {
    that.panArea.push({ x: ev.center.x, y: ev.center.y });
    if(ev.isFinal) {
      that.finalArea = Object.assign([], that.panArea);
      that.panArea = [];

      /**
       * @description that.sidenav._elementRef.nativeElement.style.visibility is the visibility of the navigation.
       */
      if(that.finalArea[0].x > 0 && that.finalArea[0].x < 40) {
        that.sidenav.open();
      }
    }
  }

  /**
   * @description Event fires when Pan detected on mobile from Right to Left.
   * @param ev 
   */
  onPanLeft(ev: any) {
    if(ev.isFinal) {
      that.sidenav.close();
    }
  }

  logout() {
    /**
     * @description Enable loader.
     */
    this.progressBar.classList.remove('hidden');

    /**
     * @description logs out the user.
     */
    this.http.logout(this.store.auth())
    .subscribe(resp => {
      /**
       * @description remove cookies.
       */
      this.store.setCookie('ps-t-a-p', '', 0);
      this.store.setCookie('ps-u-a-p', '', 0);
      this.store.user.synced = false;

      if(resp['message']['type'] !== 'error') { this.action.openSnackBarComponent('You have successfully logged out!', 'success'); }
      else { this.action.openSnackBarComponent(resp['message']['text'], 'error'); }
      /**
       * @description redirect to login page.
       */
      this.router.navigate(['/']);
    })
  }

  showRouteProgress(e: any) {
    let classList = e.target.parentNode.classList.value.split(' ');
    if(!classList.includes('active')) {
      this.progressBar.classList.remove('hidden');
    }
  }

}

