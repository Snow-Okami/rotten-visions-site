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
    this.movie.nativeElement.play();
  }

  ngAfterViewChecked() {}

}
