import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WorkingDayService } from '../services/working-day.service';
import { WorkingDay } from '../model/working-day.model';

@Component({
  selector: 'app-workingday-input',
  templateUrl: './working-day.component.html',
  styleUrls: ['./working-day.component.scss']
})
export class WorkingDayInputComponent implements AfterViewInit {

  form: FormGroup;

  @ViewChild('select', { read: ViewContainerRef })
  private select: ViewContainerRef;

  constructor(fb: FormBuilder, private workingDayService: WorkingDayService) {
    this.form = fb.group({
      'workingday': fb.control(''),
      'start': fb.control(''),
      'end': fb.control(''),
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
    const workingDay = <WorkingDay> {
      day,
      start,
      end,
      breaks: [breaks] // TODO currently workaround to statisfy the backend
    };

    this.workingDayService
      .saveWorkingDay(workingDay)
      .subscribe(
        () => { alert('SAVED!'); },
        err => { alert('ERROR' + err); }
      );
  }


}
