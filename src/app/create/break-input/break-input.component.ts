import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-break-input',
  templateUrl: './break-input.component.html',
  styleUrls: ['./break-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BreakInputComponent),
      multi: true
    }
  ]
})
export class BreakInputComponent implements ControlValueAccessor {
  start: string;
  end: string;
  durationInMin: number;

  propagateChange = (_: any) => {};

  onAnyChange(event): void {
    this.notifyAboutCurrentValues();
  }

  notifyAboutCurrentValues() {
    let result = {
      start: this.start,
      end: this.end,
      duration: null
    };

    if (this.durationInMin) {
      result = {
        ...result,
        duration: moment.duration(`PT${this.durationInMin}M`).toISOString()
      };
    }

    this.propagateChange(result);
  }

  writeValue(obj: any): void {
    // TODO currently we only read data
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
