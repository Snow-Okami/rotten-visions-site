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

import { ActionsService } from '../../services/actions.service';

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

  private loadingBar: boolean = true;
  private progressBar: Element;

  public mobileQuery: MediaQueryList;

  public image = {
    defaultUrl: '/assets/logo/game-controller.png',
    default: '/assets/logo/person.png',
    offset: 100
  };

  public achievements = [
    { title: 'Front and Center', description: 'Get a scoped headshot over 150m', score: 1, target: 130, img: '' },
    { title: 'Mousetrap Fuse', description: 'Use a trip mine to kill an enemy who is trying to assault your position enemy who is trying to assault your position.', score: 6, target: 130, img: '' },
    { title: 'Ear Plugs', description: 'Kill an enemy while your rifle fire is masked by a loud sound', score: 13, target: 130, img: '' },
    { title: 'Fuel Tank', description: 'Destroy a tank by sniping the fuel supply', score: 11, target: 130, img: '' },
    { title: 'Silent but Deadly', description: 'Covertly kill 25 unaware enemies', score: 24, target: 130, img: '' },
  ];

  constructor(
    private action: ActionsService,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 840px)');
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
    await this.action.wait(3);
    this.loadingBar = false;
  }

}

