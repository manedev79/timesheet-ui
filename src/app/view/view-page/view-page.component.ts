import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkingDayService } from 'src/app/services/working-day.service';
import { Subscription } from 'rxjs';
import { WorkingDaySummary } from 'src/app/model/working-day-summary.model';
import * as moment from 'moment';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  workingDaySummaries: WorkingDaySummary[] = [];
  year = 2012;
  month = 5;

  constructor(private workingDayService: WorkingDayService) {}

  ngOnInit() {
    this.loadData(this.year, this.month);
  }

  private loadData(year: number, month: number) {
    const currentDate = moment({year, month});
    this.subscription = this.workingDayService
      .getWorkingDaysForYearMonth(currentDate.year(), currentDate.month())
      .subscribe((workingDaySummary: WorkingDaySummary[]) => {
        this.workingDaySummaries = workingDaySummary;
      });
  }

  onChange() {
    this.loadData(this.year, this.month);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
