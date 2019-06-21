import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { User } from '../../interfaces/user';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';
import { ValidatorsService } from '../../services/validators.service';
import { ActionsService } from '../../services/actions.service';

let that: any;

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {

  public mobileQuery: MediaQueryList;
  private progressBar: any;

  private user: User;

  private title: string = 'Psynapsus - Create News';

  public disableClick: boolean = false;

  public isAdmin: boolean = false;

  public newsForm: FormGroup;
  @ViewChild('newsFormElement') newsFormElement: ElementRef

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private http: HttpService,
    private store: StoreService,
    public router: Router,
    public form: FormBuilder,
    private regx: ValidatorsService,
    public page: Location,
    private action: ActionsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.newsForm = form.group({
      title: new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.title ]),
      content: new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.description ])
    });

    that = this;
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  async ngAfterViewInit() {
    this.user = this.store.user.data;
    let r: any;

    if(!this.store.user.synced) {
      let email = atob(this.store.getCookie('ps-u-a-p'));
      r = await this.http.user(email).toPromise();
      if(r['message']['type'] !== 'error') { this.user = r['data']; }
      else { return; }
    }

    if(this.user.capability === 2) { this.isAdmin = true; }
    else { this.router.navigate(['/dashboard/news']); return; }

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');
  }

  async editOrCreate(e: Event) {
    if(this.newsForm.invalid) { this.action.openSnackBarComponent('Invalid form detected!', 'warning'); return; }

    /**
     * @description Disable buttons, inputs & enable loader.
     */
    this.disableClick = true;
    this.progressBar.classList.remove('hidden');

    let d = this.newsForm.value;
    this.resetForm();

    let r: any = await this.http.createNews(d).toPromise();
    if(r['message']['type'] !== 'error') { this.action.openSnackBarComponent('News added successfully!', 'success'); }
    else { this.action.openSnackBarComponent(r['message']['text'], 'error'); }

    this.disableClick = false;
    this.progressBar.classList.add('hidden');
  }

  resetForm(): void {
    /**
     * @description Set form fields empty.
     */
    this.newsFormElement.nativeElement.reset();
  }
}
