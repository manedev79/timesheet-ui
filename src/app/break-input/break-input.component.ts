import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
  duration: number;

  propagateChange = (_: any) => {};

  writeValue(obj: any): void {
    // TODO currently empty
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}


}
