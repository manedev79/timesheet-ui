import { Component, ViewChild, ViewContainerRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

import { WorkingDayService } from '../../services/working-day.service';
import { WorkingDay } from '../../model/working-day.model';

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
    console.log('this.workingDay', this.workingDay);

    const day = this.workingDay ? this.formatDate(moment(this.workingDay.day, 'YYYY-MM-DD')) : this.formatDate(moment());
    const start = this.workingDay ? this.formatTime(moment(this.workingDay.start)) : '';
    const end = this.workingDay ? this.formatTime(moment(this.workingDay.end)) : '';

    this.form = this.fb.group({
      'day': this.fb.control(day),
      'start': this.fb.control(start),
      'end': this.fb.control(end),
      'breaks': this.fb.control('')
    });
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
    let workingDay = <WorkingDay> {
      id,
      day: this.parseDate(day).toISOString(),
      start: null,
      end: null,
      breaks: [] // TODO currently workaround to statisfy the backend
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

    // TODO handle breaks

    console.log('Sending workingDay', workingDay);
    this.workingDayService
      .saveWorkingDay(workingDay)
      .subscribe(
        (result: WorkingDay) => { alert('SAVED!' + result); },
        err => {
          console.log('Request was: ', workingDay);
          throw err;
         }
      );
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
