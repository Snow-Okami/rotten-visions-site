import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'avataronly'
})
export class AvataronlyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.differenceBy(value, [args], 'email')[0]['avatar'];
  }

}
