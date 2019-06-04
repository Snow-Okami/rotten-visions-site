import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
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
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
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
export class GamesComponent implements OnInit {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title: string = 'Psynapsus - Games Dashboard';

  private progressBar: Element;
  public loadingBar: boolean = true;

  public image = {
    defaultUrl: '/assets/logo/game-controller.png',
    default: '/assets/logo/person.png',
    offset: 100
  };

  public games = [];

  public mobileQuery: MediaQueryList;

  constructor(
    private action: ActionsService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private router: Router,
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

    this.games = [
      {
        title: 'Desysia',
        subtitle: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
      },
      {
        title: 'IDMO',
        subtitle: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
      }
    ];

    this.loadingBar = false;
  }

  viewThisGame(id: string) {
    this.progressBar.classList.remove('hidden');
    this.router.navigate([`/dashboard/games/view/${id}`, {}], { queryParams: {} });
  }

}
