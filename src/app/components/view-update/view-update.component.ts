import { Component, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import * as _ from 'lodash';

import { RegxFormService } from '../../services/regx-form.service';
import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';
import { ActionsService } from '../../services/actions.service';

let that: any;

@Component({
  selector: 'app-view-update',
  templateUrl: './view-update.component.html',
  styleUrls: ['./view-update.component.scss']
})
export class ViewUpdateComponent implements OnInit {
  public title = 'Rottenvision | Update Details';
  
  @ViewChild('comment', { static: false }) commentFNative: any;

  public mobileQuery: MediaQueryList;
  public progressBar = true;

  public image = {
    offset: 100,
    defaultImage: '/assets/logo/small-logo.png',
    defaultHeight: 0
  };

  @ViewChild('postImage', { static: false }) postImage: ElementRef;

  public post: any = {
    image: '',
    description: 'Loading content...'
  };

  public postList: any = [];

  public window: any;
  private stickyItem: any;
  private fixerItem: any;
  private fixerTop: number = 129;

  public config: PerfectScrollbarConfigInterface = { };
  @ViewChild('posts', { static: false }) posts?: PerfectScrollbarComponent;

  public newsletterform: FormGroup;
  public commentF: FormGroup;
  public replyF: FormGroup;

  public commentEmailError: boolean = true;
  public senderEmail = {
    comment: {
      hasError: true,
      data: {}
    },
    reply: {
      hasError: true,
      data: {}
    }
  };
  public replyEmailError: boolean = true;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: StoreService,
    private http: HttpService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    public form: FormBuilder,
    private Rxjs: RegxFormService,
    public action: ActionsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.newsletterform = this.form.group({
      
      email: new FormControl('', Validators.compose([
        Validators.required, Rxjs.ngEmail
      ]))

    });

    this.commentF = this.form.group({
      createdBy: new FormControl('', Validators.compose([
        Validators.required, Rxjs.ngEmail
      ])),
      text: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    this.replyF = this.form.group({
      createdBy: new FormControl('', Validators.compose([
        Validators.required, Rxjs.ngEmail
      ])),
      text: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    that = this;
  }

  private _mobileQueryListener: () => void;

  async ngOnInit() {  
  }

  async ngAfterViewInit() {
    /**
     * @description reroute after router param changes.
     */
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      document.getElementsByClassName('route-progress-bar')[0].classList.remove('hidden');
      return false;
    }
    let param = {'id': this.route.snapshot.paramMap.get('id')};
    let r = await this.http.post(param).toPromise();
    this.post = r['data'];
    this.post.tags = JSON.parse(this.post.tags);

    /**
     * @description SET UP skip, limit & sort options here.
     */
    let option = {
      skip: 0,
      limit: 10
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
    document.getElementsByClassName('route-progress-bar')[0].classList.add('hidden');

    this.window = window;
    this.stickyItem = document.getElementsByClassName('sticky-item')[0];
    this.fixerItem = document.getElementsByClassName('item-fixer')[0];

    if(this.stickyItem) {
      this.stickItem(1);
      this.window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      this.window.addEventListener('scroll', this.onScroll, false);
    }
  }

  submit(event: Event, f: FormGroup) {
    if(!event.isTrusted) { return false; }
    if(f.invalid) { return false; }

    this.store.openSnackBar('Thanks! for subscribing.');
  }

  async commentNow(e: Event, f: FormGroup) {
    if(!e.isTrusted || f.invalid || this.senderEmail.comment.hasError) { return; }

    document.getElementsByClassName('route-progress-bar')[0].classList.remove('hidden');

    let c = _.pick(this.post, ['_id', 'id']);
    let form = Object.assign(f.value, {'createdBy': this.senderEmail.comment.data['_id'], 'createdFor': c._id, 'postId': c.id});
    let r = await this.http.comment(form).toPromise();

    this.commentFNative.nativeElement.reset();

    if(r['message']['type'] !== 'error') { this.store.openSnackBar('Thanks! for commenting.'); this.post.comments.splice(0, 0, r['data']); }

    document.getElementsByClassName('route-progress-bar')[0].classList.add('hidden');
  }

  async replyNow(e: Event, f: FormGroup, com: any) {
    if(!e.isTrusted || f.invalid || this.senderEmail.reply.hasError) { return; }

    document.getElementsByClassName('route-progress-bar')[0].classList.remove('hidden');

    let c = _.pick(com, ['_id', 'id']);
    let form = Object.assign(f.value, {'createdBy': this.senderEmail.reply.data['_id'], 'createdFor': c._id, 'commentId': c.id});
    e.target['parentElement'].classList.add('hidden');
    let r = await this.http.reply(form).toPromise();
    if(r['message']['type'] !== 'error') { this.store.openSnackBar('Thanks! for your reply.'); com.replies.push(r['data']); }

    document.getElementsByClassName('route-progress-bar')[0].classList.add('hidden');
  }

  alterForm(e: Event, ex: boolean) {
    let el = ex ? e.target['parentElement']['parentElement']['parentElement']['nextSibling'] : e.target['parentElement']['nextSibling'];
    let t = el.classList.value.includes('hidden')
    ? el.classList.remove('hidden')
    : el.classList.add('hidden');
  }

  async commentHasEmail(e: Event) {
    if(this.commentF.controls.createdBy.errors) { return; }

    let r = await this.http.userName(this.commentF.value.createdBy).toPromise();
    this.senderEmail.comment.hasError = r['message']['type'] === 'error';
    this.senderEmail.comment.data = this.senderEmail.comment.hasError ? {} : r['data'];

    // console.log(this.senderEmail.comment);
  }

  async replyHasEmail(e: Event) {
    if(this.replyF.controls.createdBy.errors) { return; }

    let r = await this.http.userName(this.replyF.value.createdBy).toPromise();
    this.senderEmail.reply.hasError = r['message']['type'] === 'error';
    this.senderEmail.reply.data = this.senderEmail.reply.hasError ? {} : r['data'];
  }

  onScroll(event: Event) {
    that.stickItem(0);
  }

  stickItem(sY: number) {
    /**
     * @description exit from the codes if window not found
     */
    if(!sY && !that.window) { return; }

    let wST = sY || that.window.scrollY;
    let pos = that.stickyItem.getBoundingClientRect();
    let sST = pos.top;
    if(sST < 130 && !that.stickyItem.classList.value.includes('pos-f')) {
      that.fixerTop = wST;
      that.stickyItem.classList.add('pos-f');
      that.fixerItem.style.height = pos.height + 'px';
      /**
       * @description Fixes the header at top.
       */
      Object.assign(that.stickyItem.style, {position: 'fixed', top: '129px', width: `${pos.width}px`});
    } else if(wST < that.fixerTop) {
      that.fixerTop = 129;
      that.stickyItem.classList.remove('pos-f');
      /**
       * @description Fixes the header at top.
       */
      Object.assign(that.stickyItem.style, {position: 'relative', top: 'auto', width: 'auto'});

      that.fixerItem.style.height = '0px';
    }
  }

}
