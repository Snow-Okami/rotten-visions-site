import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  currentMenu:string = "Our Projects";

  constructor( private dataService: DataService ) {
  }

  ngOnInit() {
  }

}
