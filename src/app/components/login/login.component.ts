import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * 
   * @description 
   */
  public email = new FormControl('', [ Validators.required ]);
  public password = new FormControl('', [ Validators.required ]);
  public hidePass: boolean = true;
  public loader: boolean = false;
  public disableClick: boolean = false;

  /**
   * 
   * @description Login or Signup Interface. 
   */
  public login = true;

  constructor() { }

  ngOnInit() {
  }

}
