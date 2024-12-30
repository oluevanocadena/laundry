import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'stringjoin',
  standalone: false
})
export class StringJoinPipe implements PipeTransform {

  transform(value: string | string[], character: string = ','): string {
    return (value as string[])?.join(character);
  }
}
