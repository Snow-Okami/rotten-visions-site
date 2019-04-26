import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimword'
})
export class TrimwordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let v = value.length > args ? value.slice(0, args) + '...' : value;
    return v;
  }

}
