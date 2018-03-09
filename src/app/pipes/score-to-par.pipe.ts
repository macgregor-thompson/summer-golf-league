import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreToPar'
})
export class ScoreToParPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
