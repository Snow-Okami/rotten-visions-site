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
  @ViewChild('loadScroll') loadScroll: any;
  @ViewChild('updateContainer') updateContainer: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onScrollDown);
  }

  private _mobileQueryListener: () => void;

  onScrollUp() {
    console.log('scroll down detected!');
  }

  onScrollDown() {
    console.log(window.innerHeight, that.loadScroll.nativeElement.getBoundingClientRect().top);
  }

}

