import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'updatefilter'
})
export class UpdatefilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let array = _.filter(value, (o) => {
      let t = o.title.toLowerCase();
      let a = args.toLowerCase();
      return t.indexOf(a) > -1;
    });
    return array;
  }

}
