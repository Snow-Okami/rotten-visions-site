import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  public commentF: FormGroup;
  public replyF: FormGroup;

  @ViewChild('postImage') postImage: ElementRef;

  public post: Post = {
    image: '',
    description: 'Loading content...'
  };

  /**
   * @description Default Post Image To Be Loaded.
   */
  public image = {
    offset: 100,
    defaultImage: '/assets/logo/img-ex-light.png',
    defaultHeight: 0
  };

  public postList: Array<Post> = [];

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public page: Location,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public form: FormBuilder,

    private action: ActionsService,
    private store: StoreService,
    private http: HttpService,
    private regx: ValidatorsService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    // this._mobileQueryListener = () => this.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;

    this.commentF = this.form.group({
      text: new FormControl('', Validators.compose([
        Validators.required, regx.description
      ]))
    });

    this.replyF = this.form.group({
      text: new FormControl('', Validators.compose([
        Validators.required, regx.description
      ]))
    });
  }

  async ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    this.hiddenContent = false;
  }

  async ngAfterContentInit() {
  }

  async ngAfterViewInit() {
    /**
     * @description reroute after router param changes.
     */
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      this.progressBar.classList.remove('hidden');
      return false;
    }

    let params = {'id': this.route.snapshot.paramMap.get('id')};
    let r = await this.http.postDetails(params.id).toPromise();
    /**
     * @description stop showing loader when post not found.
     */
    if(r['message']['type'] === 'error') { this.action.openSnackBarComponent(r['message']['text'], 'error'); this.progressBar.classList.add('hidden'); return; }

    this.post = r['data'];
    this.post.tags = JSON.parse(this.post.tags);

    /**
     * @description SET UP skip, limit & sort options here.
     */
    let option = {
      skip: 0,
      limit: 5
    };

    r = await this.http.posts(option).toPromise();
    if(r['message']['type'] !== 'error') { this.postList = r['data']; }
    /**
     * @description adjust image height after image load.
     */
    if(this.postImage) {
      let boundary = await this.action.getBoundingClientRect(this.postImage);
      this.image.defaultHeight = (boundary['width'] / 16) * 9;
    }
    /**
     * @description hide the loader
     */
    this.progressBar.classList.add('hidden');
  }

  /**
   * @description get the native form element
   */
  @ViewChild('comment') commentFNative: ElementRef;
  
  async commentNow(e: Event, f: FormGroup) {
    if(!e.isTrusted || f.invalid) { return; }

    this.progressBar.classList.remove('hidden');

    let c = _.pick(this.post, ['_id', 'id']);
    let form = Object.assign(f.value, {'createdBy': this.store.user.data._id, 'createdFor': c._id, 'postId': c.id});
    let r = await this.http.comment(form).toPromise();
    if(r['message']['type'] !== 'error') { this.action.openSnackBarComponent('Thanks! for commenting', 'success'); this.post.comments.splice(0, 0, r['data']); }
    this.commentFNative.nativeElement.reset();

    this.progressBar.classList.add('hidden');
  }

  async replyNow(e: Event, f: FormGroup, com: any) {
    if(!e.isTrusted || f.invalid) { return; }

    this.progressBar.classList.remove('hidden');

    let c = _.pick(com, ['_id', 'id']);
    let form = Object.assign(f.value, {'createdBy': this.store.user.data._id, 'createdFor': c._id, 'commentId': c.id});
    e.target['parentElement'].classList.add('hidden');
    let r = await this.http.reply(form).toPromise();
    if(r['message']['type'] !== 'error') { this.action.openSnackBarComponent('Thanks! for reply', 'success'); com.replies.push(r['data']); }

    this.progressBar.classList.add('hidden');
  }

  alterForm(e: Event, ex: boolean) {
    let el = ex ? e.target['parentElement']['parentElement']['parentElement']['nextSibling'] : e.target['parentElement']['nextSibling'];
    let t = el.classList.value.includes('hidden')
    ? el.classList.remove('hidden')
    : el.classList.add('hidden');
  }

}
