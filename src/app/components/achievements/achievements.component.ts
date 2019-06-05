import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('achvUpFormElem') achvUpFormElem: ElementRef;

  public achvUpForm = new FormGroup({
    id: new FormControl({ value: '', disabled: false }, [ Validators.required ]),
    email: new FormControl({ value: '', disabled: false }, [ Validators.required ])
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

  public disableClick: boolean = false;

  async updateAchv(e: Event) {
    if(this.achvUpForm.invalid) { this.action.openSnackBarComponent('Empty fields detected!', 'warning'); return; }

    /**
     * @description actual codes
     */
    this.disableClick = true;
    this.progressBar.classList.remove('hidden');

    let rs: any = await this.http.updateUsersInAchievement(this.achvUpForm.value, _.pick(this.achvUpForm.value, 'email')).toPromise();
    if(rs.message.type === 'error') { this.resetForm(false); this.progressBar.classList.add('hidden'); this.action.openSnackBarComponent(rs.message.text, 'error'); return; }

    let r: any = await this.http.achievement(this.achvUpForm.value).toPromise();
    if(r.message.type === 'error') { this.resetForm(false); this.progressBar.classList.add('hidden'); this.action.openSnackBarComponent(r.message.text, 'error'); return; }

    let a: any = _.find(this.achievements, {_id: this.achvUpForm.value.id});
    a.users = r.data.users;
    this.achvUpForm.setValue({id: '', email: ''});

    this.resetForm(false);
    this.progressBar.classList.add('hidden'); 
    this.action.openSnackBarComponent('Achievement updated successfully!', 'success');
  }

  resetForm(state: boolean) {
    this.achvUpFormElem.nativeElement.reset();
    this.disableClick = state;
  }

  async deleteUserFromAchievement(e: Event) {
    if(this.achvUpForm.invalid) { this.action.openSnackBarComponent('Empty fields detected!', 'warning'); return; }

    /**
     * @description actual codes
     */
    this.disableClick = true;
    this.progressBar.classList.remove('hidden');

    let rs: any = await this.http.deleteUserFromAchievement(this.achvUpForm.value, _.pick(this.achvUpForm.value, 'email')).toPromise();
    if(rs.message.type === 'error') { this.resetForm(false); this.progressBar.classList.add('hidden'); this.action.openSnackBarComponent(rs.message.text, 'error'); return; }

    let r: any = await this.http.achievement(this.achvUpForm.value).toPromise();
    if(r.message.type === 'error') { this.resetForm(false); this.progressBar.classList.add('hidden'); this.action.openSnackBarComponent(r.message.text, 'error'); return; }

    let a: any = _.find(this.achievements, {_id: this.achvUpForm.value.id});
    a.users = r.data.users;
    this.achvUpForm.setValue({id: '', email: ''});

    this.resetForm(false);
    this.progressBar.classList.add('hidden'); 
    this.action.openSnackBarComponent('Achievement updated successfully!', 'success');
  }
}

