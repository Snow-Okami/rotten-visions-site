import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { User } from '../../interfaces/user';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import * as _ from 'lodash';

import { ActionsService } from '../../services/actions.service';
import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({ overflow: 'hidden' })),
      state('closed', style({ height: '0px', overflow: 'hidden' })),
      transition('open => closed', [ animate('0.4s') ]),
      transition('closed => open', [ animate('0.7s') ]),
    ])
  ]
})
export class NewsComponent implements OnInit {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - News';

  public loadingBar: boolean = true;
  private progressBar: Element;

  public mobileQuery: MediaQueryList;

  public isAdmin: boolean = false;

  private user: User;
  /**
   * @description Update Text Changes As Required Before Or After HTTP Request & Response.
   */
  public updateText = 'Checking for news...';

  public image = {
    defaultImage: '/assets/logo/img-ex-light.png',
    defaultUrl: '/assets/logo/game-controller.png',
    default: '/assets/logo/person.png',
    offset: 100
  };

  public news: any = [];

  constructor(
    public store: StoreService,
    public action: ActionsService,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private http: HttpService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 770px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  async ngAfterContentInit() {}

  async ngAfterViewInit() {
    this.user = this.store.user.data;
    let r: any;

    if(!this.store.user.synced) {
      let email = atob(this.store.getCookie('ps-u-a-p'));
      r = await this.http.user(email).toPromise();
      if(r['message']['type'] !== 'error') { this.user = r['data']; }
      else { return; }
    }

    if(this.user.capability === 2) {
      this.isAdmin = true;
    }
    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

    r = await this.http.news().toPromise();
    this.news = r['data'];
    this.loadingBar = false;
  }

  visitCreate() {
    /**
     * @description Show Progress Bar When Page is Loading.
     */
    this.progressBar.classList.remove('hidden');

    this.router.navigate(['/dashboard/news/create']);
  }

  visitDetails(_id: number) {
    console.log('visit detected', _id);
  }

}
