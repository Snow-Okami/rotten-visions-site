import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public title = 'Rotten-Visions';
  public mobileQuery: MediaQueryList;

  @ViewChild('movie') movie: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
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

  ngAfterViewInit() {
    
  }

  ngAfterViewChecked() {}

  private _mobileQueryListener: () => void;

  /**
   * 
   * @param c is the child route component. All available variables and funtions will be returned.
   */
  routeChange(c) {
    document.title = c.title ? c.title : 'Rotten Visions';
  }

  playMovie() {
    // document.querySelectorAll('.movie')[0].play();
    // this.movie.nativeElement.play();
  }

}
