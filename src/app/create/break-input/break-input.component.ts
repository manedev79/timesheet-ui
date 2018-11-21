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

  propagateChange = (_: any) => {};

  onStartChange(event): void {
    if (!this.isValidTime(this.start)) {
      return;
    }

    if (this.isValidTime(this.end)) {
      // Start + End given -> update Duration
      this.durationInMin = this.calcDiffInMinutes(this.start, this.end);
    } else if (this.isValidDuration(this.durationInMin)) {
      // Start + Duration given -> update End
      this.end = this.addMinutesToTime(this.start, this.durationInMin);
    }

    this.notifyAboutCurrentValues();
  }

  onEndChange(event): void {
    if (!this.isValidTime(this.end)) {
      return;
    }

    if (this.isValidTime(this.start)) {
      // End + Start given -> update Duration
      this.durationInMin = this.calcDiffInMinutes(this.start, this.end);
    } else if (this.isValidDuration(this.durationInMin)) {
      // End + Duration given -> update Start
      this.start = this.subtractMinutesToTime(this.end, this.durationInMin);
    }

    this.notifyAboutCurrentValues();
  }

  onDurationChange(event): void {
    if (!this.isValidDuration(this.durationInMin)) {
      return;
    }

    if (this.isValidTime(this.start)) {
      // Duration + Start given -> update End
      this.end = this.addMinutesToTime(this.start, this.durationInMin);
    } else if (this.isValidTime(this.end)) {
      // Duration + End given -> update Start
      this.start = this.subtractMinutesToTime(this.end, this.durationInMin);
    }

    this.notifyAboutCurrentValues();
  }

  private addMinutesToTime(time: string, minutes: number): string {
    return this.parseTime(time).add(minutes, 'minutes').format('HH:mm');
  }

  private subtractMinutesToTime(time: string, minutes: number): string {
    return this.parseTime(time).subtract(minutes, 'minutes').format('HH:mm');
  }

  private calcDiffInMinutes(startTime: string, endTime: string): number {
    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);
    return Math.abs(start.diff(end, 'minutes'));
  }

  private parseTime(time: string): moment.Moment {
    return moment(time, 'HH:mm');
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
