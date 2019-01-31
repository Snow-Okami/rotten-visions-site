import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

let that: any;

@Component({
  selector: 'app-view-update',
  templateUrl: './view-update.component.html',
  styleUrls: ['./view-update.component.css']
})
export class ViewUpdateComponent {
  public title = 'Rotten Visions | Update Details';

  public mobileQuery: MediaQueryList;
  public progressBar = true;

  public image = {
    offset: 100,
    defaultImage: '/assets/logo/small-logo.png'
  };

  public post: any = {
    image: ''
  };

  public description: string = 'We are saving this post into draft. <strong>Please ignore. We are saving this post into draft. Please ignore. We are saving this post into draft.</strong> Please ignore. We are saving this post into draft. Please ignore. We are saving this post into draft. Please ...'

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: StoreService,
    private http: HttpService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  private _mobileQueryListener: () => void;

  async ngOnInit() {
    let param = {'id': this.route.snapshot.paramMap.get('id')};
    let r = await this.http.post(param).toPromise();
    this.post = r['data'];
    this.post.tags = JSON.parse(this.post.tags);
  }

  ngAfterViewInit() {
    document.getElementsByClassName('route-progress-bar')[0].classList.add('hidden');
  }

}
