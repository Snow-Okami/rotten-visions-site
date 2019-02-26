import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';
import * as _ from 'lodash';

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
      return (spaceex.test(control.value) || control.value.length < 6) ? { invalid: true } : null;
    }
    return null;
  }

  /**
   * @description Title Field Validator. Title Must Have 2 Words.
   */
  title(control: FormControl) {
    if (control.value && control.value.length > 0) {
      let regex = /^[A-Za-z]{1,}\s[A-Za-z]{1,}/gm;
      const matches = regex.test(control.value);
      return !matches ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }

  /**
   * @description Group name validator.
   */
  groupName(control: FormControl) {
    if (control.value && control.value.length > 0) {
      let v = control.value.trim();
      return (v.length) ? null : { invalid_characters: true };
    }
    return null;
  }

  /**
   * @description 
   */
  description(control: FormControl) {
    if (control.value && control.value.length > 0) {
      let regex = /^[<A-Za-z0-9>]{1,}\s/gm;
      let matches = regex.test(control.value);
      let wordList = _.filter(_.split(_.replace(control.value, /\n/gm, ' '), ' '), (o) => {
        return o.length > 0;
      });
      return wordList.length >= 10 ? matches ? null : { invalid_characters: true } : { invalid_length: true };
    } else {
      return null;
    }
  }

  /**
   * @description 
   */
  name(control: FormControl) {
    if (control.value && control.value.length > 0) {
      let regex = /^[A-Z][a-z]/gm;
      const matches = regex.test(control.value.trim());
      return !matches ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }

  /**
   * @description 
   */
  registerForm(group: FormGroup) {
    return group.controls.confirmPassword.value === group.controls.password.value ? null : { incorrect_password: true };
  }
}
