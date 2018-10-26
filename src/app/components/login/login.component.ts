import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * @description 
   */
  public email = new FormControl('', [ Validators.required ]);
  public password = new FormControl('', [ Validators.required ]);
  public hidePass: boolean = true;
  public disableClick: boolean = false;

  @Input() mobileQuery;
  @Input() loader;

  /**
   * 
   * @description Login or Signup Interface. 
   */
  public login = true;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {

    /**
     * @description Loader is an element generated using Material Theme.
     */
    this.loader._elementRef.nativeElement.classList.add('hidden');
  }

}
