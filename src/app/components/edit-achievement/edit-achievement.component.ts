import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { User } from '../../interfaces/user';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';
import { ValidatorsService } from '../../services/validators.service';
import { ActionsService } from '../../services/actions.service';

let that: any;

@Component({
  selector: 'app-edit-achievement',
  templateUrl: './edit-achievement.component.html',
  styleUrls: ['./edit-achievement.component.scss']
})
export class EditAchievementComponent implements OnInit {
  public mobileQuery: MediaQueryList;
  private progressBar: any;

  private user: User;

  private title: string = 'Psynapsus - Edit Achievement';

  public disableClick: boolean = false;

  public isAdmin: boolean = false;

  private achievementId: any;

  public achievementForm: FormGroup;
  @ViewChild('achievementFormElement') achievementFormElement: ElementRef

  public hideImage: boolean = true;
  @ViewChild('dropImage') image: ElementRef;
  @ViewChild('dropFile') file: ElementRef;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private http: HttpService,
    private store: StoreService,
    public router: Router,
    private route: ActivatedRoute,
    public form: FormBuilder,
    private regx: ValidatorsService,
    public page: Location,
    private action: ActionsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.achievementForm = form.group({
      title: new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.title ]),
      description: new FormControl({ value: '', disabled: false }, [ Validators.required, this.regx.description ])
    });

    that = this;
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  async ngAfterViewInit() {
    this.user = this.store.user.data;
    let r: any;

    if(!this.store.user.synced) {
      let email = atob(this.store.getCookie('ps-u-a-p'));
      r = await this.http.user(email).toPromise();
      if(r['message']['type'] !== 'error') { this.user = r['data']; }
      else { return; }
    }

    if(this.user.capability === 2) { this.isAdmin = true; }
    else { this.router.navigate(['/dashboard/achievements']); return; }

    this.achievementId = this.route.snapshot.params;
    r = await this.http.achievement(this.route.snapshot.params).toPromise();

    if(r['message']['type'] == 'error') { this.progressBar.classList.add('hidden'); return; }

    this.achievementForm.setValue(_.pick(r.data, ['title', 'description']));
    if(r.data.thumbnail !== '') { this.image.nativeElement['src'] = r.data.thumbnail; this.hideImage = false; this.image.nativeElement.addEventListener('load', () => { that.progressBar.classList.add('hidden'); }); }

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

    console.log(this.achievementId, r);

  }

}
