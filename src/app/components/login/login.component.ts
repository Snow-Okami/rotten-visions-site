import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
    this.store.setCookie('ps-u-a-p', 'abhisek507', 1);
    this.store.setCookie('ps-t-a-p', 'abcd', 1);
    this.router.navigate(['/dashboard']);
  }

}
