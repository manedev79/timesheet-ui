import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';
import { WorkingDay } from '../model/working-day.model';
import { Timesheet } from '../model/timesheet';

@Injectable()
export class WorkingDayService {

  constructor(private http: HttpClient) {}

  saveWorkingDay(workingDay: WorkingDay): Observable<WorkingDay> {

    const momDay = moment(workingDay.day, moment.ISO_8601, true);
    const month = momDay.format('YYYY-MM');
    const url = `${environment.baseUrl}/timesheet/${month}/workingday`;

    return this.http.post<WorkingDay>(url, workingDay);
  }

  getWorkingDayByDay(year: number, month: number, day: number): Observable<WorkingDay> {
    const momDay = moment().set({
      year,
      month,
      date: day
    }).utc(true);

    const url = `${environment.baseUrl}/timesheet/${momDay.format('YYYY-MM')}/workingDay/${momDay.format('MM-DD')}`;

    return this.http.get<WorkingDay>(url, {
      params: {
        day: momDay.format('YYYY-MM-DD')
      }
    });
  }

  getWorkingDaysForYearMonth(year: number, month: number): Observable<Timesheet> {
    const yearMonth = moment().set({
      year: year,
      month: month
    }).format('YYYY-MM');
    const url = `${environment.baseUrl}/timesheet/${yearMonth}`;
    return this.http.get<Timesheet>(url, {});
  }

}
