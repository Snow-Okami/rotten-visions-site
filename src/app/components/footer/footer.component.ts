import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  /**
   * 
   * @description version is the app version.
   */
  public version: string = '2.4.1';

  constructor() { }

  ngOnInit() { }

}
