import { Component } from '@angular/core';

//Services
import { DataService } from './services/data.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  image_url_base:String = 'assets/Rotten-vision-design/';
  mob:String = "Mobile_version_elements/";
  desk:String = "Desktop_version_elements/";
  src:String = "Source/";

  activeMenu:String;

  constructor( private dataService: DataService ){
  }

  routeNavigation (event) {
  	this.activeMenu = event.currentMenu;
  	document.title = "Rotten Visions | " + event.currentMenu;
  }

  openBlog() {
    window.open("http://localhost:4000", "_blank");
  }

}
