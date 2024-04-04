import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number | string, symbol: string, position: string): string {
    return position === 'right' ? `${value}${symbol}` : `${symbol}${value}`
  }

}
