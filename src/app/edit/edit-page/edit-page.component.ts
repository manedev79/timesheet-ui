import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkingDay } from 'src/app/model/working-day.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent {

  workingDay: WorkingDay = null;

  constructor(private route: ActivatedRoute) {
    this.route.data
      .pipe(
        map(data => data.workingDay)
      )
      .subscribe(
        (workingDay: WorkingDay) => this.workingDay = workingDay
      );
  }

}
