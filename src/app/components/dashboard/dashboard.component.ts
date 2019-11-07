import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { tween, styler, easing } from 'popmotion';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public title: string = 'Rotten-Visions';
  public mobileQuery: MediaQueryList;
  public searchText: string = '';

  public enableSearch: boolean;

  @ViewChild('searchElem') searchElem: ElementRef;
  private pmselem: any;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private route: ActivatedRoute,
    private location: Location,
    private store: StoreService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.enableSearch = false;
  }

  ngOnInit() {
    this.store.currentMessage.subscribe(text => this.searchText = text);
  }

  ngOnDestroy() {}

  ngOnChanges() {}

  ngDoCheck() {}

  ngAfterContentInit() {}

  ngAfterContentChecked() {}

  ngAfterViewInit() {
    this.pmselem = styler(this.searchElem.nativeElement);
    this.handleSearchbar();
  }

  ngAfterViewChecked() {}

  private _mobileQueryListener: () => void;

  /**
   * 
   * @param c is the child route component. All available variables and funtions will be returned.
   */
  routeChange(c: any) {
    document.title = c.title ? c.title : 'Rotten Visions';
    this.enableSearch = c.title === 'Rotten Visions | Updates';

    this.handleSearchbar();
  }

  showRouteProgress(e: any) {
    let classList = e.target.parentNode.classList.value.split(' ');
    if(!classList.includes('active')) {
      document.getElementsByClassName('route-progress-bar')[0].classList.remove('hidden');
    }
  }

  search() {
    this.store.changeMessage(this.searchText);
  }

  handleSearchbar() {
    if(!this.pmselem) { return; }

    let pos: any = {
      from: {
        x: 0, scale: 0
      },
      to: {
        x: 0, scale: 0
      }
    };

    if(this.enableSearch) {
      pos = {
        from: { x: this.searchElem.nativeElement.clientWidth, scale: 0 },
        to: { x: 0, scale: 1 },
      }

      tween({
        from: pos.from,
        to: pos.to,
        ease: easing.anticipate,
        duration: 500,
      }).start({
        update: (v: any) => this.pmselem.set(v),
        complete: () => {},
      });
    } else if(this.pmselem.get('x') < 1) {
      pos = {
        from: { x: 0, scale: 1 },
        to: { x: this.searchElem.nativeElement.clientWidth, scale: 0 },
      };

      tween({
        from: pos.from,
        to: pos.to,
        ease: easing.anticipate,
        duration: 500,
      }).start({
        update: (v: any) => this.pmselem.set(v),
        complete: () => {},
      });
    }
  }

}
