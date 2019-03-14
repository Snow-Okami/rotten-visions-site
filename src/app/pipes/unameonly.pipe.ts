import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'unameonly'
})
export class UnameonlyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.differenceBy(value, [args], 'email')[0]['username'];
  }

}

