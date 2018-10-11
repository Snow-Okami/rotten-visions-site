import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public title: string = 'Rotten-Visions';
  public mobileQuery: MediaQueryList;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {}

  ngOnDestroy() {}

  ngOnChanges() {}

  ngDoCheck() {}

  ngAfterContentInit() {}

  ngAfterContentChecked() {}

  ngAfterViewInit() {}

  ngAfterViewChecked() {}

  private _mobileQueryListener: () => void;

  /**
   * 
   * @param c is the child route component. All available variables and funtions will be returned.
   */
  routeChange(c) {
    document.title = c.title ? c.title : 'Rotten Visions';
  }

  showRouteProgress(e) {
    let classList = e.target.parentNode.classList.value.split(' ');
    if(!classList.includes('active')) {
      document.getElementsByClassName('route-progress-bar')[0].classList.remove('hidden');
    }
  }

}
