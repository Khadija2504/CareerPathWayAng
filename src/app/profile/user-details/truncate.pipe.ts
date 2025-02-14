import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: false
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, wordCount: number): string {
    if (!value) return '';
    const words = value.split(' ');
    return words.length > wordCount ? words.slice(0, wordCount).join(' ') + '...' : value;
  }
}