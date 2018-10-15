import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimword'
})
export class TrimwordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
