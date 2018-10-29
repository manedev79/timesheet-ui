import { Component, ViewChild, ViewContainerRef, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

import { WorkingDayService } from '../../services/working-day.service';
import { WorkingDay } from '../../model/working-day.model';
import { DayViewModel } from '@clr/angular/forms/datepicker/model/day-view.model';

@Component({
  selector: 'app-workingday-input',
  templateUrl: './working-day-input.component.html',
  styleUrls: ['./working-day-input.component.scss']
})
export class WorkingDayInputComponent implements AfterViewInit {

  form: FormGroup;

  @Input()
  workingDay: WorkingDay = null;

  @ViewChild('select', { read: ViewContainerRef })
  private select: ViewContainerRef;

  constructor(fb: FormBuilder, private workingDayService: WorkingDayService) {

    const day = this.workingDay ? this.workingDay.day : '';
    const start = this.workingDay ? this.workingDay.day : '';
    const end = this.workingDay ? this.workingDay.end : '';

    this.form = fb.group({
      'day': fb.control(day),
      'start': fb.control(start),
      'end': fb.control(end),
      'breaks': fb.control('')
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.select.element.nativeElement.focus();
    });
  }

  submit() {
    const { day, start, end, breaks } = this.form.value;
    const startValue = this.buildMoment(day, start);
    const endValue = this.buildMoment(day, end);
    const dayValue = this.parseDate(day);

    const id = this.workingDay ? this.workingDay.id : null;

    // TODO handle breaks
    const workingDay = <WorkingDay> {
      id,
      day: dayValue.toISOString(),
      start: startValue.toISOString(),
      end: endValue.toISOString(),
      breaks: [] // TODO currently workaround to statisfy the backend
    };

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

  private parseTime(time: string): moment.Moment {
    return moment(time, 'HH:mm', true);
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
