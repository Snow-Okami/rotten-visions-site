import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * @description 
   */
  public hidePass: boolean = true;
  public disableClick: boolean = false;
  public email = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.email ]);
  public password = new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.password ]);
  public loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });
  private progressBar;

  @Input() mobileQuery;
  @ViewChild('loginFormElement') loginFormElement;

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
    this.openSnackBar('This feature is under progress!', '');
    this.disableClick = false;
  }

}
