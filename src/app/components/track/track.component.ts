import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

import { HttpService } from '../../services/http.service';

import { User } from '../../classes/user';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
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
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
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
    ? ['username']
    : ['id', 'username', 'email', 'firstName', 'lastName', 'emailValidated', 'allowedToAccess'];

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');

  }

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
