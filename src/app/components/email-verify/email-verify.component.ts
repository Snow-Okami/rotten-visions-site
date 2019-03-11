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

  constructor(
    private http: HttpService,
    private store: StoreService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
    let r = await this.http.verifyEmail(this.route.snapshot.params).toPromise();

    console.log(r);
  }

  ngAfterViewInit() {

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');
  }

}
