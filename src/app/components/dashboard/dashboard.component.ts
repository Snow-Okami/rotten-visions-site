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
  
  @ViewChild('container') container: any;
  private mc;
  private panArea = [];

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
    this.mc.on("panright", this.onPan);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onPan(ev) {
    that.panArea.push({ x: ev.center.x, y: ev.center.y });
    if(ev.isFinal) {
      let area = Object.assign([], that.panArea);
      that.panArea = [];
      console.log(area);
    }
    // console.log(ev);
  }

}

