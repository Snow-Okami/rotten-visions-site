import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('movie') movie: any;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  ngOnChanges() {}

  ngDoCheck() {}

  ngAfterContentInit() {}

  ngAfterContentChecked() {}

  ngAfterViewInit() {
    // this.movie.nativeElement.play();
    console.log('1. init called');
  }

  ngAfterViewChecked() {}

  /**
   * 
   * @param c is the child route component. All available variables and funtions will be returned.
   */
  routeChange(c) {
    // this.movie.nativeElement.play();
    console.log('2. route called');
  }

}
