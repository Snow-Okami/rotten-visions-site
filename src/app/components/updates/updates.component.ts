import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Updates Dashboard';

  public mobileQuery: MediaQueryList;
  private progressBar;
  public updates = [];

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private router: Router,
    private http: HttpService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  ngAfterViewInit() {

    this.http.posts({})
    .subscribe(resp => {
      if(resp['message']['type'] !== 'error') {
        this.updates = resp['data'];

        /**
         * @description Hide Progress Bar When Page is Loaded.
         */
        this.progressBar.classList.add('hidden');
      } else {

      }
    });
  }

  visitCreate() {
    /**
     * @description Show Progress Bar When Page is Loading.
     */
    this.progressBar.classList.remove('hidden');

    this.router.navigate(['/dashboard/updates/create']);
  }

}
