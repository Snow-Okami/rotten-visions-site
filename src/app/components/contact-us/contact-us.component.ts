import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

import { trigger,state,style,transition, animation, keyframes, animate, group} from '@angular/animations';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  animations: [

  	trigger('slideInOut', [
        state('in', style({
            'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
        })),
        state('out', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('in => out', [group([
            animate('300ms ease-in-out', style({
                'opacity': '0'
            })),
            animate('500ms ease-in-out', style({
                'max-height': '0px'
            })),
            animate('700ms ease-in-out', style({
                'visibility': 'hidden'
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('500ms ease-in-out', style({
                'visibility': 'visible'
            })),
            animate('1500ms ease-in-out', style({
                'max-height': '500px'
            })),
            animate('2000ms ease-in-out', style({
                'opacity': '1'
            }))
        ]
        )])
    ])
  ],
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  currentMenu:string = "Contact Us";
  msgSender:boolean = true;
  state:string = 'out';

  constructor( private dataService: DataService ) {
  }

  ngOnInit() {
  }

  textFocus(){
  	this.state =  'in';
  }

  textFocusOut(){
  	this.state = 'out';
  }

}
