import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { ActionsService } from '../../services/actions.service';
import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({ overflow: 'hidden' })),
      state('closed', style({ height: '0px', overflow: 'hidden' })),
      transition('open => closed', [ animate('0.4s') ]),
      transition('closed => open', [ animate('0.7s') ]),
    ])
  ]
})
export class AchievementsComponent implements OnInit {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Achievements';

  public loadingBar: boolean = true;
  private progressBar: Element;

  public mobileQuery: MediaQueryList;

  public image = {
    defaultUrl: '/assets/logo/game-controller.png',
    default: '/assets/logo/person.png',
    offset: 100
  };

  public achvUpForm = new FormGroup({
    id: new FormControl({ value: '', disabled: false }, []),
    email: new FormControl({ value: '', disabled: false }, [])
  });

  public totalUser: number = 0;

  public achievements: any = [];

  constructor(
    public store: StoreService,
    public action: ActionsService,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private http: HttpService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 770px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');
  }

  async ngAfterViewInit() {
    let cu = await this.http.countUser().toPromise();
    this.totalUser = cu['data'];

    let r = await this.http.achievements().toPromise();
    this.achievements = r['data'];
    this.loadingBar = false;
  }

  async updateAchv(e: Event) {
    this.progressBar.classList.remove('hidden');

    let r: any = await this.http.achievement(this.achvUpForm.value).toPromise();
    if(r.message.type === 'error') { this.progressBar.classList.add('hidden'); this.action.openSnackBarComponent(r.message.text, 'error'); return; }

    let u: any = await this.http.user(this.achvUpForm.value.email).toPromise();
    if(u.message.type === 'error') { this.progressBar.classList.add('hidden'); this.action.openSnackBarComponent(u.message.text, 'error'); return; }
    let users = _.uniq(_.concat(r.data.users, u.data._id));

    let rs: any = await this.http.updateAchievement(this.achvUpForm.value, {users: users}).toPromise();
    if(rs.message.type === 'error') { this.progressBar.classList.add('hidden'); this.action.openSnackBarComponent(rs.message.text, 'error'); return; }

    let a: any = _.find(this.achievements, {_id: this.achvUpForm.value.id});
    a.users = users;
    this.achvUpForm.setValue({id: '', email: ''});

    this.progressBar.classList.add('hidden'); 
    this.action.openSnackBarComponent('Achievement updated successfully!', 'success');
  }
}

