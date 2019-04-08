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
  public firstName = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.name ]);
  public lastName = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.name ]);
  public username = new FormControl({ value: '', disabled: true }, [ Validators.required, this.regx.username ]);
  public email = new FormControl({ value: '', disabled: true }, [ Validators.required, this.regx.email ]);

  @ViewChild('profileCreateFormElement') profileCreateFormElement: ElementRef;
  public profileForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    email: this.email
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
      _.pick(this.user, ['firstName', 'lastName', 'username', 'email'])
    );

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.hiddenContent = false;
    this.progressBar.classList.add('hidden');
  }

  ngAfterViewInit() {

  }

  updateProfile(event: any) {
    console.log(this.profileForm.value);
  }

}
