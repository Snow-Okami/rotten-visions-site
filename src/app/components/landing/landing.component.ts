import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  public mobileQuery: MediaQueryList;
  
  @ViewChild('loader') loader;

  /**
   * @description Login or Signup Interface. 
   */
  public login = true;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  private _mobileQueryListener: () => void;

}
