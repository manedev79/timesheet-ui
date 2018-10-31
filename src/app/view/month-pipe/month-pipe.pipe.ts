import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'monthDate' })
export class MonthDatePipe implements PipeTransform {
  transform(month: number) {
    return month !== null ? moment().month(month).format('MMMM') : '';
  }
}
