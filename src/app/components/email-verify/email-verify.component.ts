import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Verify Your Email';

  public mobileQuery: MediaQueryList;
  private progressBar: any;

  public state = {
    initial: true,
    loading: false,
    loaded: false
  };

  public response = {
    error: false,
    success: false
  };

  constructor(
    private http: HttpService,
    private store: StoreService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
  }

  async ngAfterViewInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

    let r = await this.http.verifyEmail(this.route.snapshot.params).toPromise();

    this.state.initial = false;
    this.state.loaded = true;

    this.response.error = r['message']['type'] === 'error';
    this.response.success = !this.response.error;
    // this.response.success = true;
  }

}
