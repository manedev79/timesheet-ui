import { Component, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MonthSelectorComponent),
    }
  ]
})
export class MonthSelectorComponent implements ControlValueAccessor {

  @Input()
  monthNumber: number = moment().month();

  @Output()
  monthChanged = new EventEmitter<number>();

  propagateChange = (_: any) => {};

  increase() {
    if (this.monthNumber++ >= 11) {
      this.monthNumber = 0;
    }
    this.notify();
  }

  decrease() {
    if (this.monthNumber-- <= 0) {
      this.monthNumber = 11;
    }
    this.notify();
  }

  writeValue(month: number): void {
    this.monthNumber = month;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}

  private notify() {
    this.monthChanged.emit(this.monthNumber);
    this.propagateChange(this.monthNumber);
  }
}
