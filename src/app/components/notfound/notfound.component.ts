import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
  public title = 'Rottenvision | Page Not Found';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.getElementsByClassName('route-progress-bar')[0].classList.add('hidden');
  }
}
