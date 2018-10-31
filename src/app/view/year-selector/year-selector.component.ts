import { Component, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => YearSelectorComponent),
    }
  ]
})
export class YearSelectorComponent implements ControlValueAccessor {

  @Input()
  year: number = moment().year();

  @Output()
  yearChanged = new EventEmitter<number>();

  propagateChange = (_: any) => {};

  increase() {
    this.year++;
    this.notify();
  }

  decrease() {
    this.year--;
    this.notify();
  }

  writeValue(year: number): void {
    this.year = year;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}

  private notify() {
    this.yearChanged.emit(this.year);
    this.propagateChange(this.year);
  }
}
