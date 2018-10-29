import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { StoreService } from '../../services/store.service';

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
  public loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });
  public hidePass: boolean = true;
  public disableClick: boolean = false;

  @Input() mobileQuery;
  @Input() loader;

  /**
   * 
   * @description Login or Signup Interface. 
   */
  public login = true;

  constructor(
    private store: StoreService,
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {

    /**
     * @description Loader is an element generated using Material Theme.
     */
    this.loader._elementRef.nativeElement.classList.add('hidden');
  }

  loginFun() {
    if(this.loginForm.valid) {
      let form = Object.assign({}, this.loginForm.value);
      this.http.login(form)
      .subscribe(resp => {
        console.log('response', resp);
        
        // if(resp['message']['type'] != 'error') {
        //   this.store.setCookie('ps-t-a-p', resp['token'], 1);
        //   this.store.setCookie('ps-u-a-p', this.email.value, 1);
        //   this.router.navigate(['/dashboard']);
        // }
      });
    }
  }

}
