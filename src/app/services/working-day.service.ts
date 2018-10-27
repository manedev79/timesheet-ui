import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { WorkingDay } from '../model/working-day.model';
import { WorkingDaySummary } from '../model/working-day-summary.model';

@Injectable()
export class WorkingDayService {

  constructor(private http: HttpClient) {}

  getWorkingDays(): Observable<WorkingDay[]> {
    const url = `${environment.baseUrl}/workingdays`;
    return this.http.get<WorkingDay[]>(url);
  }

  getWorkingDay(workingDayId: number): Observable<WorkingDay> {
    const url = `${environment.baseUrl}/workingdays/${workingDayId}`;
    return this.http.get<WorkingDay>(url);
  }

  saveWorkingDay(workingDay: WorkingDay): Observable<WorkingDay> {
    const url = `${environment.baseUrl}/workingdays/`;
    return this.http.post<WorkingDay>(url, workingDay);
  }

  getWorkingDayByDay(year: number, month: number, day: number): Observable<WorkingDay> {
    const url = `${environment.baseUrl}/workingdays/`;
    return this.http.get<WorkingDay>(url, {
      params: {
        day: this.getYearMonthDayAsIso8601(year, month, day)
      }
    });
  }

  getWorkingDaysForYearMonth(year: number, month: number): Observable<WorkingDaySummary[]> {
    const url = `${environment.baseUrl}/monthlytimesheets/`;
    return this.http.get<WorkingDaySummary[]>(url, {
      params: {
        yearMonth: this.getYearMonthAsIso8601(year, month)
      }
    });
  }

  private getYearMonthAsIso8601(year: number, month: number): string {
    return `${year}-${month.toString().padStart(2, '0')}`;
  }

  private getYearMonthDayAsIso8601(year: number, month: number, day: number): string {
    return `${this.getYearMonthAsIso8601(year, month)}-${day.toString().padStart(2, '0')}`;
  }

}
