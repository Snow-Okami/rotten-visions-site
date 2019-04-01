import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { User } from '../../interfaces/user';
import { Post } from '../../interfaces/post';

import { ActionsService } from '../../services/actions.service';
import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';
import { ValidatorsService } from '../../services/validators.service';

let that: any;

@Component({
  selector: 'app-view-update',
  templateUrl: './view-update.component.html',
  styleUrls: ['./view-update.component.scss']
})
export class ViewUpdateComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - View Update Details';

  public mobileQuery: MediaQueryList;
  private progressBar: any;
  private user: User;
  public hiddenContent: boolean = true;
  private _mobileQueryListener: () => void;

  public post: Post = {
    image: '',
    description: 'Loading content...'
  };

  /**
   * @description Default Post Image To Be Loaded.
   */
  public image = {
    offset: 100,
    defaultImage: '/assets/logo/img-ex-light.png'
  };

  public postList: Array<Post> = [];

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public page: Location,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,

    private action: ActionsService,
    private store: StoreService,
    private http: HttpService,
    private regx: ValidatorsService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => this.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  detectChanges(data?: any) {
    console.log('change detected!', data);
  }

  async ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    this.hiddenContent = false;
  }

  async ngAfterViewInit() {
    let params = {'id': this.route.snapshot.paramMap.get('id')};
    let r = await this.http.postDetails(params.id).toPromise();
    this.post = r['data'];
    this.post.tags = JSON.parse(this.post.tags);

    /**
     * @description SET UP skip, limit & sort options here.
     */
    let option = {
      skip: params.id
    };

    r = await this.http.posts(option).toPromise();
    if(r['message']['type'] !== 'error') { this.postList = r['data']; }
    this.progressBar.classList.add('hidden');

    console.log(this.post, this.postList);
  }

}
