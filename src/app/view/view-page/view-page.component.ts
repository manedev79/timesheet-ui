import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { WorkingDayService } from '../../services/working-day.service';
import { WorkingDaySummary } from '../../model/working-day-summary.model';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  workingDaySummaries: WorkingDaySummary[] = [];

  year = moment().year();
  month = moment().month();

  // TODO activate for testing
  // year = 2012;
  // month = 5;

  constructor(private workingDayService: WorkingDayService) {}

  ngOnInit() {
    this.onChange();
  }

  onChange() {
    this.loadData(this.year, this.month);
  }

  private loadData(year: number, month: number) {
    this.subscription = this.workingDayService
      .getWorkingDaysForYearMonth(year, month)
      .subscribe((workingDaySummary: WorkingDaySummary[]) => {
        this.workingDaySummaries = workingDaySummary;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
