import { Component, OnInit } from '@angular/core';

import { ActionsService } from '../../services/actions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - Profile Dashboard';

  private progressBar: any;

  constructor(
    private action: ActionsService
  ) { }

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  ngAfterViewInit() {

    /**
     * @description Hide Progress Bar When Page is Loaded.
     */
    this.progressBar.classList.add('hidden');
  }

  showSnack() {
    this.action.openSnackBarComponent('Abhisek', 'success');
  }

}
