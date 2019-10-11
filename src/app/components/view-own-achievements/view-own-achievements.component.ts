import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import * as _ from 'lodash';

import { User } from '../../interfaces/user';

import { ActionsService } from '../../services/actions.service';
import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

let that: any;

@Component({
  selector: 'app-view-own-achievements',
  templateUrl: './view-own-achievements.component.html',
  styleUrls: ['./view-own-achievements.component.scss']
})
export class ViewOwnAchievementsComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - View Achievements';
  
  private user: User;
  public isAdmin: boolean = false;

  private progressBar: any;
  public mobileQuery: MediaQueryList;
  public hiddenContent: boolean = true;
  private _mobileQueryListener: () => void;

  public achievements: any;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,

    public store: StoreService,
    public action: ActionsService,
    private router: Router,
    private http: HttpService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    // this._mobileQueryListener = () => this.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  async ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    this.hiddenContent = false;
  }

  async ngAfterViewInit() {
    /**
     * @description hide the loader
     */
    this.progressBar.classList.add('hidden');
  }

  async ngAfterContentInit() {
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

    const populate = JSON.stringify([
      {path: 'users'},
      {path: 'game', select: ['title', 'subtitle']}
    ]);

    let ac: any = await this.http.achievements(`?users=${this.store.user.data._id}&populate=${populate}`).toPromise();
    this.achievements = _.groupBy(ac.data, 'game')
    
    /**
     * @description COMMENTED TEXT
     */
    console.log('achievements', this.achievements);
  }

}
