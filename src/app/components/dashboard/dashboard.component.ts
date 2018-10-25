import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import 'hammerjs';

let that;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public mobileQuery: MediaQueryList;
  public navList = [
    { nav: 'Games', url: '/dashboard/games' },
    { nav: 'Messages', url: '/dashboard/messages' },
    { nav: 'Updates', url: '/dashboard/updates' }
  ];
  private _mobileQueryListener: () => void;

  @ViewChild('snav') sidenav: any;
  
  @ViewChild('container') container: any;
  private mc;
  private panArea = [];
  public finalArea = [];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  /**
   * 
   * @param c is the child route component. All available variables and funtions will be returned.
   */
  routeChange(c) {
    document.title = c.title ? c.title : 'Angular 6 Quick Start';
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let containerElement = this.container._element.nativeElement;
    this.mc = new Hammer.Manager(containerElement);
    this.mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
    this.mc.on("panright", this.onPanRight);
    this.mc.on("panleft", this.onPanLeft);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onPanRight(ev) {
    that.panArea.push({ x: ev.center.x, y: ev.center.y });
    if(ev.isFinal) {
      that.finalArea = Object.assign([], that.panArea);
      that.panArea = [];

      /**
       * @description that.sidenav._elementRef.nativeElement.style.visibility is the visibility of the navigation.
       */
      if(that.finalArea[0].x > 0 && that.finalArea[0].x < 40) {
        that.sidenav.open();
      }
    }
  }

  onPanLeft(ev) {
    if(ev.isFinal) {
      that.sidenav.close();
    }
  }

}

