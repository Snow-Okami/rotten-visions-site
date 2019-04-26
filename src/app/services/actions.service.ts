import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor() { }

  async getBoundingClientRect(elem: ElementRef) {
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {if(elem) { clearInterval(timer); resolve(elem.nativeElement.getBoundingClientRect()); }}, 500);
    });
  }
}
