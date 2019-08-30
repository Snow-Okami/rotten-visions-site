import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

let that: any;

@Component({
  selector: 'app-view-own-achievements',
  templateUrl: './view-own-achievements.component.html',
  styleUrls: ['./view-own-achievements.component.scss']
})
export class ViewOwnAchievementsComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - View Achievements';

  private progressBar: any;
  public mobileQuery: MediaQueryList;
  public hiddenContent: boolean = true;
  private _mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    // this._mobileQueryListener = () => this.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    that = this;
  }

  async ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    this.hiddenContent = false;
  }

  async ngAfterViewInit() {
    /**
     * @description hide the loader
     */
    this.progressBar.classList.add('hidden');
  }

}
