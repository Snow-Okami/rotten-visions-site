import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RegxFormService extends Validators {
  constructor() {
    super();
  }

  name(control: FormControl) {

    // first check if the control has a value
    if (control.value && control.value.length > 0) {
      let regex = /^[A-Z][a-z]{1,}\s[A-Z][a-z]{1,}/gm;

      // match the control value against the regular expression
      const matches = regex.test(control.value);

      // if there are no matches return an object, else return null.
      return !matches ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }

  email(control: FormControl) {

    // first check if the control has a value
    if (control.value && control.value.length > 0) {
      let regex = /[A-Za-z0-9\.\-\_]{3,}@[A-Za-z0-9\-\_]{3,}\.[A-Za-z]{2,}/gm;

      // match the control value against the regular expression
      const matches = regex.test(control.value);

      // if there are no matches return an object, else return null.
      return !matches ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }

  message(control: FormControl) {

    // first check if the control has a value
    if (control.value && control.value.length > 0) {
      let regex = /^[A-Za-z]{1,}\s/gm;

      // match the control value against the regular expression
      let matches = regex.test(control.value);
      let wordList = _.filter(_.split(_.replace(control.value, /\n/gm, ' '), ' '), (o) => {
        return o.length > 0;
      });

      // if there are no matches return an object, else return null.
      return wordList.length >= 10 ? matches ? null : { invalid_characters: true } : { invalid_length: true };
    } else {
      return null;
    }
  }
}
