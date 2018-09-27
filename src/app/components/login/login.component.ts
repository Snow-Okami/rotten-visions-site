import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
// import { MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  /* providers: [
    { provide: MatFormFieldControl, useExisting: LoginComponent }
  ] */
})
export class LoginComponent implements OnInit {
  public email = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

}
