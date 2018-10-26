import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  public mobileQuery: MediaQueryList;

  /**
   * 
   * @description 
   */
  public email = new FormControl('', [ Validators.required ]);
  public password = new FormControl('', [ Validators.required ]);
  public hidePass: boolean = true;
  public loader: boolean = false;
  public disableClick: boolean = false;

  /**
   * 
   * @description Login or Signup Interface. 
   */
  public login = true;

  /**
   * 
   * @description version is the app version.
   */
  public version: string = '1.7.0';

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  private _mobileQueryListener: () => void;

}
