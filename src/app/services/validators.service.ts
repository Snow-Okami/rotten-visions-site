import { Injectable } from '@angular/core';
import {
  FormControl,
  Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService extends Validators  {

  constructor() {
    super();
  }

  /**
   * @description email validator function.
   * @param control FormControl which is bind to this validate function.
   */
  email(control: FormControl) {
    if (control.value && control.value.length > 0) {
      let regex = /[A-Za-z0-9\.\-\_]{3,}@[A-Za-z0-9\-\_]{3,}\.[A-Za-z]{2,}/gm;
      let spaceex = /\s/gm;
      return (!spaceex.test(control.value) && regex.test(control.value)) ? null : { invalid_characters: true };
    }
    return null;
  }

  password(control: FormControl) {
    if (control.value && control.value.length > 0) {
      let spaceex = /\s/gm;
      return (spaceex.test(control.value) || control.value.length < 5) ? { invalid_characters: true } : null;
    }
    return null;
  }
}
