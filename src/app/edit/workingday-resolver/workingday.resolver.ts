import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, empty } from 'rxjs';
import * as moment from 'moment';

import { WorkingDay } from '../../model/working-day.model';
import { WorkingDayService } from '../../services/working-day.service';

@Injectable()
export class WorkingDayResolver implements Resolve<Observable<WorkingDay>> {

  constructor(private workingDayService: WorkingDayService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<WorkingDay> {
      console.log('resolve', route, state);

      const date = moment(route.params['date'], 'YYYY-MM-DD', true);
      if (date.isValid()) {
        return this.workingDayService.getWorkingDayByDay(date.year(), date.month(), date.date());
      } else {
        return empty();
      }
  }

  private isValidDate(date: Date) {
    return date instanceof Date && !isNaN(date as any);
  }

}
