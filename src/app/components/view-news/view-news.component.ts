import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { User } from '../../interfaces/user';

import { ActionsService } from '../../services/actions.service';
import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

import * as _ from 'lodash';

let that: any;

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.scss']
})
export class ViewNewsComponent implements OnInit {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - View News Details';

  public loadingBar: boolean = true;
  private progressBar: Element;

  public user: User;

  public isAdmin: boolean = false;

  public news: any;

  public mobileQuery: MediaQueryList;

  public window: any;
  private stickyItem: any;
  private fixerItem: any;
  private fixerTop: number = 63;

  public config: PerfectScrollbarConfigInterface = { };
  @ViewChild('allnews') allnews?: PerfectScrollbarComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public media: MediaMatcher,
    private http: HttpService,
    public store: StoreService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 770px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  async ngAfterViewInit() {

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
      this.isAdmin = true;
    }

    /**
     * @description reroute after router param changes.
     */
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      this.progressBar.classList.remove('hidden');
      return false;
    }

    let params = this.route.snapshot.params;
    r = await this.http.newsDetails(params).toPromise();
    this.news = r['data'];
    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');
  }

  backToNews() {
    /**
     * @description Show Progress Bar When Page is Loading.
     */
    this.progressBar.classList.remove('hidden');

    this.router.navigate(['/dashboard/news']);
  }

  async editThisUpdate(_id: any) {
    /**
     * @description Show Progress Bar When Page is Loading.
     */
    this.progressBar.classList.remove('hidden');

    this.router.navigate([`/dashboard/news/edit/${_id}`]);
  }

}
