import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-achievement',
  templateUrl: './edit-achievement.component.html',
  styleUrls: ['./edit-achievement.component.scss']
})
export class EditAchievementComponent implements OnInit {

  private title: string = 'Psynapsus - Edit Achievement';

  constructor() { }

  ngOnInit() {
  }

}
