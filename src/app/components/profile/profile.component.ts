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

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.hiddenContent = false;
    this.progressBar.classList.add('hidden');
  }

  ngAfterViewInit() {

  }

  public hideImage: boolean = true;
  @ViewChild('dropImage') image: any;
  @ViewChild('dropFile') file: any;

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

  updateProfile(event: any) {
    console.log(this.profileForm.valid);
  }

}
