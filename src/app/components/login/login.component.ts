import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // Encapsulation has to be disabled in order for the
  // component style to apply to the select panel.
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  /**
   * @description Angular 6 Models Are Defined Below.
   */
  public hidePass: boolean = true;
  public hideConPass: boolean = true;
  public disableClick: boolean = false;
  private progressBar: any;

  public availableUser = {
    data: {},
    hasError: true
  };

  /**
   * @description Login Form Controls Are Defined Below.
   */
  public firstName = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.name ]);
  public lastName = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.name ]);
  public username = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.username ]);
  public email = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.email ]);
  public confirmEmail = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.email ]);
  public password = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.password ]);
  public confirmPassword = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.password ]);
  public capability = new FormControl({ value: '', disabled: false }, [ Validators.required ]);
  /**
   * @description Login Form Group Is Defined Here.
   */
  public loginForm = new FormGroup({});

  /**
   * @description Register Form Group Is Defined Here.
   */
  public registerForm = new FormGroup({}); // , [ Validators.required, this.regx.registerForm ]

  @Input() mobileQuery;
  @ViewChild('loginFormElement') loginFormElement;
  @ViewChild('registerFormElement') registerFormElement;

  /**
   * 
   * @description Login or Signup Interface. 
   */
  public login = true;

  constructor(
    private store: StoreService,
    private http: HttpService,
    private router: Router,
    public snackBar: MatSnackBar,
    private regx: ValidatorsService
  ) { }

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  ngAfterViewInit() { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
      duration: 3000,
    });
  }

  loginFun() {

    /**
     * @description SETUP the loginForm Instance.
     */
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });

    if(this.loginForm.valid) {

      /**
       * @description Disable buttons, inputs & enable loader.
       */
      this.disableClick = true;
      this.hidePass = true;
      this.progressBar.classList.remove('hidden');

      /**
       * @description form contains email and password.
       */
      let loginForm = Object.assign({}, this.loginForm.value);

      /**
       * @description Set form fields empty.
       */
      this.loginFormElement.nativeElement.reset();

      /**
       * @description Login HTTP request with form object.
       */
      this.http.login(loginForm)
      .subscribe(resp => {
        if(resp['message']['type'] !== 'error') {

          /**
           * @description Store tokens and redirect to dashboard.
           */
          this.store.setCookie('ps-t-a-p', resp['data']['token'], 3);
          this.store.setCookie('ps-u-a-p', btoa(loginForm.email), 3);
          this.router.navigate(['/dashboard']);

          this.openSnackBar('You have successfully logged in!', '');
        } else {

          /**
           * @description Disable buttons & enable loader.
           */
          this.disableClick = false;
          this.progressBar.classList.add('hidden');

          this.openSnackBar(resp['message']['text'], '');
        }
      });
    }
  }

  registerFun() {
    /**
     * @description SETUP the loginForm Instance.
     */
    this.registerForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      confirmEmail: this.confirmEmail,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      capability: this.capability
    }); // , [ Validators.required, this.regx.registerForm ]

    if(!this.registerForm.valid) { return false; }

    if(this.registerForm.value.confirmEmail !== this.registerForm.value.email) {
      this.openSnackBar('Confirm email don\'t match!', '');
      return false;
    }

    if(this.registerForm.value.confirmPassword !== this.registerForm.value.password) {
      this.openSnackBar('Confirm password don\'t match!', '');
      return false;
    }

    /**
     * @description Disable buttons, inputs & enable loader.
     */
    this.disableClick = true;
    this.hidePass = true;
    this.progressBar.classList.remove('hidden');

    /**
     * @description form contains email and password.
     */
    let registerForm = Object.assign({}, this.registerForm.value, { isMale: true, fullName: (this.firstName.value + ' ' + this.lastName.value) });

    /**
     * @description Set form fields empty.
     */
    this.registerFormElement.nativeElement.reset();

    /**
     * @description Login HTTP request with form object.
     */
    this.http.register(registerForm)
    .subscribe(resp => {
      if(resp['message']['type'] !== 'error') {

        this.http.login(_.pick(registerForm, ['email', 'password']))
        .subscribe(loginResp => {
          if(loginResp['message']['type'] !== 'error') {
            /**
             * @description Store tokens and redirect to dashboard.
             */
            this.store.setCookie('ps-t-a-p', loginResp['data']['token'], 3);
            this.store.setCookie('ps-u-a-p', btoa(registerForm.email), 3);
            this.router.navigate(['/dashboard']);

            this.openSnackBar('You have successfully logged in!', '');
          }
          else {
            /**
             * @description Disable buttons & enable loader.
             */
            this.disableClick = false;
            this.progressBar.classList.add('hidden');

            this.openSnackBar(loginResp['message']['text'], '');
          }
        });

      }
      else {
        /**
         * @description Disable buttons & enable loader.
         */
        this.disableClick = false;
        this.progressBar.classList.add('hidden');

        this.openSnackBar(resp['message']['text'], '');
      }
    });
  }

  async hasUsername(e: Event) {
    if(this.username.errors) { return; }
    let r = await this.http.hasUser(this.username.value).toPromise();
    this.availableUser.hasError = r['message']['type'] === 'error';
    this.availableUser.data = this.availableUser.hasError ? {} : r['data'];
  }

}
