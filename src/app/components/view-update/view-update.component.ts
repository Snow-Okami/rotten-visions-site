import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-update',
  templateUrl: './view-update.component.html',
  styleUrls: ['./view-update.component.scss']
})
export class ViewUpdateComponent implements OnInit {
  /**
   * @description title is going to show on the browser tab when component is loaded.
   */
  private title = 'Psynapsus - View Update Details';

  private progressBar: any;

  constructor() { }

  ngOnInit() {
    this.progressBar = document.getElementsByClassName('progressbar')[0];
  }

  ngAfterViewInit() {
    this.progressBar.classList.add('hidden');
  }

}
