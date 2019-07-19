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
  selector: 'app-create-achievement',
  templateUrl: './create-achievement.component.html',
  styleUrls: ['./create-achievement.component.scss']
})
export class CreateAchievementComponent implements OnInit {

  public mobileQuery: MediaQueryList;
  private progressBar: any;

  private user: User;

  private title: string = 'Psynapsus - Create Achievement';

  public disableClick: boolean = false;

  public isAdmin: boolean = false;

  public games = [];

  public achievementForm: FormGroup;
  @ViewChild('achievementFormElement') achievementFormElement: ElementRef

  public hideImage: boolean = true;
  @ViewChild('dropImage') image: ElementRef;
  @ViewChild('dropFile') file: ElementRef;

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

    this.achievementForm = form.group({
      game: new FormControl({ value: '', disabled: false }, [ Validators.required ]),
      title: new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.title ]),
      description: new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.description ])
    });

    that = this;
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  async ngAfterContentInit() {
    
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
    else { this.router.navigate(['/dashboard/achievements']); return; }

    r = await this.http.games('?limit=100&skip=0&sort=-1&select=title').toPromise();
    if(r['message']['type'] !== 'error') { this.games = r['data']; }

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

  }

  async editOrCreate(e: Event) {
    if(this.achievementForm.invalid) { this.action.openSnackBarComponent('Invalid form detected!', 'warning'); return; }

    /**
     * @description Disable buttons, inputs & enable loader.
     */
    this.disableClick = true;
    this.progressBar.classList.remove('hidden');
    /**
     * @description Create FormData to be POST to API.
     */
    let form = new FormData();
    
    /**
     * @description Append File and Tag only when they are available.
     */
    if(this.file.nativeElement['files'].length) {
      form.append('thumbnail', this.file.nativeElement['files'][0]);
    }

    /**
     * @description REQUIRED FromData Fields.
     */
    form.append('game', this.achievementForm.value.game);
    form.append('title', this.achievementForm.value.title);
    form.append('description', _.split(_.trim(this.achievementForm.value.description), '\n').join('<br>'));

    this.resetForm();

    let r: any = await this.http.createAchievement(form).toPromise();
    if(r['message']['type'] !== 'error') { this.action.openSnackBarComponent('Achievement added successfully!', 'success'); }
    else { this.action.openSnackBarComponent(r['message']['text'], 'error'); }

    this.disableClick = false;
    this.progressBar.classList.add('hidden');
  }

  resetForm(): void {
    this.removeImage();
    /**
     * @description Set form fields empty.
     */
    this.achievementFormElement.nativeElement.reset();
  }

  async showImage(e: Event) {
    let image = this.image.nativeElement;
    let file = this.file.nativeElement;
    let reader  = new FileReader();

    reader.addEventListener("load", function () {
      image['src'] = reader.result;
      that.hideImage = false;
    }, false);

    if (file['files'][0]) {
      reader.readAsDataURL(file['files'][0]);
    }
  }

  removeImage(): void {
    this.hideImage = true;
    this.image.nativeElement['src'] = '';
    this.file.nativeElement.value = null;
  }

}
