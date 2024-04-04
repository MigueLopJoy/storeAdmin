import { Pipe, PipeTransform } from '@angular/core';
import { max } from 'rxjs';

@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, maxLength: number, ellipsis: string = '...'): string {
    if (value.length > maxLength) return value.substring(0, maxLength) + ellipsis
    else return value
  }

}
