import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkingDayService } from 'src/app/services/working-day.service';
import { Subscription } from 'rxjs';
import { WorkingDaySummary } from 'src/app/model/working-day-summary.model';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  workingDaySummaries: WorkingDaySummary[] = [];

  constructor(private workingDayService: WorkingDayService) {}

  ngOnInit() {
    // Load days for current year and month
    const currentDate = new Date();
    this.subscription = this.workingDayService
      .getWorkingDaysForYearMonth(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1)
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
