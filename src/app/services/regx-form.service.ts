import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
      const matches = regex.test(control.value);
      const wordList = control.value.split(' ');
      const word = wordList.length;

      console.log(word);

      // if there are no matches return an object, else return null.
      return !matches ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }
}
