import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { HttpService } from '../../services/http.service';

import { User } from '../../classes/user';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TrackComponent implements OnInit {

  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Track Users';

  private progressBar: any;
  public mobileQuery: MediaQueryList;

  constructor(
    private http: HttpService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 940px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
  }

  ngAfterContentInit() {

  }

  async ngAfterViewInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];

    let r = await this.http.users().toPromise();
    if(r['message']['type'] === 'error') { return false; }
    const users = r['data'];
    
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.mobileQuery.matches
    ? ['fullName']
    : ['id', 'username', 'email', 'firstName', 'lastName', 'emailValidated', 'allowedToAccess'];

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

  }

  expandedElement: User | null;
  displayedColumns: string[];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
