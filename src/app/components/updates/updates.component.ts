import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

let that;

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent {
  public title = 'Rotten Visions | Updates';
  public mobileQuery: MediaQueryList;
  public array = Array.from({length: 20}, (_, i) => `Coming soon...`);
  private lastScrollTop = 0;
  @ViewChild('loadScroll') loadScroll: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onScrollDown, false);
  }

  private _mobileQueryListener: () => void;

  isScrollDown() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    let type = st > this.lastScrollTop ? true : false;
    this.lastScrollTop = st <= 0 ? 0 : st;
    return type;
  }

  onScrollDown(e) {
    /**
     * @description wh is window height
     * eb is element's bottom
     */
    let wh = window.innerHeight, eb = that.loadScroll.nativeElement.getBoundingClientRect().top + 20;
    if(that.isScrollDown() && wh >= eb) {
      window.removeEventListener('scroll', that.onScrollDown);
      console.log('call detected!');
    }
  }

}

