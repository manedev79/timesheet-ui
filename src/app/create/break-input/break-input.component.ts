import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import { Break } from '../../model/break.model';

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

  // Disabled states
  timeDisabled = false;
  durationDisabled = false;

  propagateChange = (_: any) => {};

  onStartChange(event): void {
    if (!this.isValidTime(this.start)) {
      this.durationDisabled = false;
      return;
    }

    this.durationInMin = null;
    this.durationDisabled = true;

    this.notifyAboutCurrentValues();
  }

  onEndChange(event): void {
    if (!this.isValidTime(this.end)) {
      this.durationDisabled = false;
      return;
    }

    this.durationInMin = null;
    this.durationDisabled = true;
    this.notifyAboutCurrentValues();
  }

  onDurationChange(event): void {
    if (!this.isValidDuration(this.durationInMin)) {
      this.timeDisabled = false;
      return;
    }

    // Deactivate time
    this.start = null;
    this.end = null;
    this.timeDisabled = true;

    this.notifyAboutCurrentValues();
  }

  private isValidDuration(input: any) {
    return input !== null && input !== undefined && input !== '' && input >= 0;
  }

  private isValidTime(input: any) {
    return input !== null && input !== undefined && input !== '';
  }

  writeValue(obj: Break): void {
    if (!obj) {
      return;
    }

    if (obj.start) {
      this.start = this.extractTime(obj.start);
    }

    if (obj.end) {
      this.end = this.extractTime(obj.end);
    }

    if (obj.duration) {
      this.durationInMin = moment.duration(obj.duration).asMinutes();
    }

    setTimeout(() => this.notifyAboutCurrentValues()); // WHY ANGULAR, WHY?
  }

  private extractTime(input: string): string {
    return moment(input).format('HH:mm');
  }

  private notifyAboutCurrentValues() {
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

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
