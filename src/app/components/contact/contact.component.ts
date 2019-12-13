import { Component, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { RegxFormService } from '../../services/regx-form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public title = 'Rottenvision | Contact';
  public mobileQuery: MediaQueryList;
  @ViewChild('form', { static: false }) form: any;

  /**
   * @description Contact form fields
   */
  public emailFormControl = new FormControl('', [ Validators.required, this.regx.email ]);
  public nameFormControl = new FormControl('', [ Validators.required, this.regx.name ]);
  public messageFormControl = new FormControl('', [ Validators.required, this.regx.message ]);
  public contactForm = new FormGroup({
    name: this.nameFormControl,
    email: this.emailFormControl,
    message: this.messageFormControl
  });

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public snackBar: MatSnackBar,
    private regx: RegxFormService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    document.getElementsByClassName('route-progress-bar')[0].classList.add('hidden');
  }

  private _mobileQueryListener: () => void;

  onShare() {
    if(this.contactForm.valid) {
      let form = Object.assign({}, this.contactForm.value);
      /**
       * @description Perform form submit actions using HTTP
       */
      this.form.nativeElement.reset();
      this.snackBar.open('Thanks! for sharing with us.', '', { duration: 3000 });
    }
  }

}
