import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';

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

  private content: any;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private router: Router,
    private http: HttpService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

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

        this.updates = resp['data'];

        /**
         * @description Hide Progress Bar When Page is Loaded.
         */
        this.progressBar.classList.add('hidden');
      } else {
        this.updateText = 'Sorry! updates not available.';
        this.progressBar.classList.add('hidden');
      }
    });
  }

  ngAfterViewInit() {
    this.content = document.getElementsByClassName('mat-sidenav-content')[0];
    this.content.addEventListener('scroll', this.onScrollDown, false);
  }

  visitCreate() {
    /**
     * @description Show Progress Bar When Page is Loading.
     */
    this.progressBar.classList.remove('hidden');

    this.router.navigate(['/dashboard/updates/create']);
  }

  onScrollDown(e) {
    console.log(e);
  }

}
