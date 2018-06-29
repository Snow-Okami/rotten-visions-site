import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  currentMenu:string = "Contact Us";

  constructor( private dataService: DataService ) {
  }

  ngOnInit() {
  }

}
