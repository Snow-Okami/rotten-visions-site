import { Component, OnInit } from '@angular/core';

//Services 
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  currentMenu:string = "About Us";

  constructor( private dataService: DataService ) {
  }

  ngOnInit() {
  }

}
