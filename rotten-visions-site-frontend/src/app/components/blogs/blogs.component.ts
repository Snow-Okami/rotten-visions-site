import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  
  currentMenu:string = "Blog";

  constructor( private dataService: DataService ) {
  }

  ngOnInit() {
  }

}
