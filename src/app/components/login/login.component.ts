import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
// import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // public email = new FormControl('', [Validators.required, Validators.email]);
  public title = 'Rotten-Visions';
  public mobileQuery: MediaQueryList;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy() {}

  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //     this.email.hasError('email') ? 'Not a valid email' :
  //       '';
  // }

  private _mobileQueryListener: () => void;

}
