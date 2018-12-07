import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameonly'
})
export class NameonlyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
