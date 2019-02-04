import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

import { RegxFormService } from '../../services/regx-form.service';
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

  public postList: any = [];

  public newsletterform: FormGroup;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: StoreService,
    private http: HttpService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private form: FormBuilder,
    private Rxjs: RegxFormService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.newsletterform = this.form.group({
      
      email: new FormControl('', Validators.compose([
        Validators.required, Rxjs.ngEmail
      ]))

    });

    that = this;
  }

  private _mobileQueryListener: () => void;

  async ngOnInit() {
    let param = {'id': this.route.snapshot.paramMap.get('id')};
    let r = await this.http.post(param).toPromise();
    this.post = r['data'];
    this.post.tags = JSON.parse(this.post.tags);

    /**
     * @description SET UP skip, limit & sort options here.
     */
    let option = {
      skip: param.id
    };

    r = await this.http.posts(option).toPromise();
    if(r['message']['type'] !== 'error') { this.postList = r['data']; }
  }

  ngAfterViewInit() {
    document.getElementsByClassName('route-progress-bar')[0].classList.add('hidden');
  }

  submit(event: Event, f: FormGroup) {
    if(!event.isTrusted) { return false; }
    if(f.invalid) { return false; }

    this.store.openSnackBar('Thanks! for subscribing.');
  }

}
