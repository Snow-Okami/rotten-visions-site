import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { User } from '../../interfaces/user';

import { ActionsService } from '../../services/actions.service';
import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';
import { ValidatorsService } from '../../services/validators.service';

let that: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Profile Dashboard';

  private progressBar: any;

  public mobileQuery: MediaQueryList;

  public hiddenContent: boolean = true;
  public disableClick: boolean = false;

  public user: User;

  /**
   * @description Form controls and Groups are as follows
   */
  public firstName = new FormControl({ value: '', disabled: false }, [ this.regx.name ]);
  public lastName = new FormControl({ value: '', disabled: false }, [ this.regx.name ]);
  public username = new FormControl({ value: '', disabled: true }, [ this.regx.username ]);
  public email = new FormControl({ value: '', disabled: true }, [ this.regx.email ]);
  public currentPassword = new FormControl({ value: '', disabled: false }, [ this.regx.password ]);
  public password = new FormControl({ value: '', disabled: false }, [ this.regx.password ]);
  public confirmPassword = new FormControl({ value: '', disabled: false }, [ this.regx.password ]);

  @ViewChild('profileCreateFormElement') profileCreateFormElement: ElementRef;
  public profileForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    email: this.email,

    currentPassword: this.currentPassword,
    password: this.password,
    confirmPassword: this.confirmPassword
  });

  public hideImage: boolean = true;
  @ViewChild('dropImage') image: any;
  @ViewChild('dropFile') file: any;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public page: Location,

    private action: ActionsService,
    private store: StoreService,
    private http: HttpService,
    private regx: ValidatorsService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  private _mobileQueryListener: () => void;

  async ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    this.user = this.store.user.data;
    let r: any;

    if(!this.store.user.synced) {
      let email = atob(this.store.getCookie('ps-u-a-p'));
      r = await this.http.user(email).toPromise();
      if(r['message']['type'] !== 'error') { this.user = r['data']; }
    }

    this.hiddenContent = false;

    /**
     * @description set the profile form's values
     */
    this.profileForm.setValue(
      Object.assign(_.pick(this.user, ['firstName', 'lastName', 'username', 'email']), {
        currentPassword: '',
        password: '',
        confirmPassword: ''
      })
    );
    if(this.user.avatar !== '') {console.log(this.user); this.image.nativeElement['src'] = this.user.avatar; this.hideImage = false; this.image.nativeElement.addEventListener('load', () => { let tr = that.stopLoading(); }); }
    else {let tr = this.stopLoading();}
  }

  ngAfterViewInit() {

  }

  showImage(event: any): void {
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

  async updateProfile(event: any) {
    /**
     * @description do nothing with invalid form
     */
    if(this.profileForm.invalid) { return false; }
    /**
     * @description warn when password change feild in invalid
     */
    if(this.profileForm.value.currentPassword || this.profileForm.value.password || this.profileForm.value.confirmPassword) {
      if(!this.profileForm.value.currentPassword) { this.action.openSnackBarComponent('Current password is empty!', 'warning'); return false; }
      else if(!this.profileForm.value.password) { this.action.openSnackBarComponent('Password is empty!', 'warning'); return false; }
      else if(!this.profileForm.value.confirmPassword) { this.action.openSnackBarComponent('Confirm password is empty!', 'warning'); return false; }
    }
    /**
     * @description disable the update button click
     */
    this.disableClick = true;
    this.progressBar.classList.remove('hidden');
    /**
     * @description update the user with required fields
     */
    let data = _.pick(this.profileForm.value, ['firstName', 'lastName']);
    /**
     * @description binds the image file or URL as needed
     */
    if(!this.hasImage(this.image.nativeElement['src'])) {
      Object.assign(data, {avatar: ''});
    } else if(this.hasImage(this.image.nativeElement['src']) && this.file.nativeElement['files'].length) {
      Object.assign(data, {avatar: this.file.nativeElement['files'][0]});
    }
    /**
     * @description upload data as FormData to API
     */
    let form: FormData = this.getFormData(data);
    let r = await this.http.updateUser({email: this.user.email}, form).toPromise();
    if(r['message']['type'] === 'error') {
      /**
       * @description Set file field empty.
       */
      this.file.nativeElement.value = null;
      this.action.openSnackBarComponent(r['message']['text'], 'error');
      return this.stopLoading();
    }
    /**
     * @description update the synced user data
     */
    this.store.user.synced = false;

    /**
     * @description update password when available
     */
    if(this.profileForm.value.currentPassword && this.profileForm.value.password && this.profileForm.value.confirmPassword) {
      if(this.profileForm.value.password !== this.profileForm.value.confirmPassword) {
        this.action.openSnackBarComponent('Confirm password doesn\'t match!', 'warning');
        return this.stopLoading();
      }
      let data = _.pick(this.profileForm.value, ['currentPassword', 'password']);
      let r = await this.http.updatePassword({email: this.user.email}, data).toPromise();
      if(r['message']['type'] === 'error') { this.action.openSnackBarComponent(r['message']['text'], 'error'); return this.stopLoading(); }
      this.store.setCookie('ps-t-a-p', r['data']['token'], 3);
    }
    return this.stopLoading();
  }

  stopLoading() { this.disableClick = false; this.progressBar.classList.add('hidden'); return false; }
  /**
   * @description generates a form data from JSON object
   */
  getFormData(ob: any): FormData { let f = new FormData(), ot = _.forIn(ob,(v,k)=>f.append(k, v)); return f; }
  /**
   * @description detects a genuine image from its URL
   */
  hasImage(url: string): boolean { let ao = ['https://res.cloudinary.com/', 'data:image/png;base64', 'data:image/jpg;base64', 'data:image/jpeg;base64', 'data:image/gif;base64']; return _.find(ao, o => url.includes(o)) ? true : false; }

}
