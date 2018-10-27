import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { WorkingDay } from '../model/working-day.model';

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

}
