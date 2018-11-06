import { Component, ViewChild, ViewContainerRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as moment from 'moment';

import { WorkingDayService } from '../../services/working-day.service';
import { WorkingDay } from '../../model/working-day.model';
import { Break } from '../../model/break.model';

@Component({
  selector: 'app-workingday-input',
  templateUrl: './working-day-input.component.html',
  styleUrls: ['./working-day-input.component.scss']
})
export class WorkingDayInputComponent implements AfterViewInit, OnChanges {
  form: FormGroup;

  @Input()
  workingDay: WorkingDay = null;

  @ViewChild('select', { read: ViewContainerRef })
  private select: ViewContainerRef;

  constructor(private fb: FormBuilder, private workingDayService: WorkingDayService) {
    this.initalizeFields();
  }

  initalizeFields() {
    const day = this.workingDay ? this.formatDate(moment(this.workingDay.day, 'YYYY-MM-DD')) : this.formatDate(moment());
    const start = this.workingDay ? this.formatTime(moment(this.workingDay.start)) : '';
    const end = this.workingDay ? this.formatTime(moment(this.workingDay.end)) : '';
    const description = this.workingDay ? this.workingDay.description : '';

    this.form = this.fb.group({
      'day': this.fb.control(day),
      'start': this.fb.control(start),
      'end': this.fb.control(end),
      'description': this.fb.control(description),
      'breaks': this.fb.array(this.initBreaks())
    });
  }

  private initBreaks() {
    // TODO load existing
    return [ this.emptyBreak() ];
  }

  private emptyBreak() {
    return this.break(null, null, null);
   }

  private break(start: string, end: string, duration: string) {
   return this.fb.control({ start, end, duration });
  }

  private getBreaks(): FormArray {
    return <FormArray>this.form.controls['breaks'];
  }

  addBreak() {
    this.getBreaks().push(this.emptyBreak());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.workingDay) {
      this.initalizeFields();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.select.element.nativeElement.focus();
    });
  }

  submit() {
    const { day, start, end, breaks } = this.form.value;
    const id = this.workingDay ? this.workingDay.id : null;
    let workingDay = <Partial<WorkingDay>> {
      id: id,
      day: this.parseDate(day).toISOString(),
    };

    // Start set?
    if (start) {
      workingDay = {
        ...workingDay,
        start: this.buildMoment(day, start).toISOString()
      };
    }

    // End set?
    if (end) {
      workingDay = {
        ...workingDay,
        end: this.buildMoment(day, end).toISOString()
      };
    }

    // Breaks given
    if (breaks) {
      workingDay = {
        ...workingDay,
        breaks: this.convertBreaks(day, breaks)
      };
    }

    console.log('Sending workingDay', workingDay);
    this.workingDayService
      .saveWorkingDay(workingDay as WorkingDay)
      .subscribe(
        (result: WorkingDay) => { alert('SAVED!' + result); },
        err => {
          console.log('Request was: ', workingDay);
          throw err;
         }
      );
  }

  private convertBreaks(day: string, breaks: Break[]): Break[] {
    return breaks
      .map(b => ({ // convert all breaks with the given day
        start: b.start ? this.buildMoment(day, b.start).toISOString() : null,
        end: b.end ? this.buildMoment(day, b.end).toISOString() : null,
        duration: b.duration as string
      }))
      .filter(b => (b.start || b.end || b.duration)); // filter out all empty breaks
  }

  private parseDate(date: string): moment.Moment {
    return moment(date, 'DD.MM.YYYY', true).utc(true);
  }

  private formatDate(date: moment.Moment): string {
    return date.format('DD.MM.YYYY');
  }

  private parseTime(time: string): moment.Moment {
    return moment(time, 'HH:mm', true);
  }

  private formatTime(time: moment.Moment): string {
    return time.format('HH:mm');
  }

  private buildMoment(date: string, time: string) {
    const momDate = this.parseDate(date);
    const momTime = this.parseTime(time);
    return moment().set({
      year: momDate.year(),
      month: momDate.month(),
      date: momDate.date(),
      hour: momTime.hour(),
      minute: momTime.minute(),
      second: 0,
      millisecond: 0
    });
  }

}
