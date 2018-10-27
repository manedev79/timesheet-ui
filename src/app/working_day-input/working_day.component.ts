import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-workingday-input',
  templateUrl: './working_day.component.html',
  styleUrls: ['./working_day.component.scss']
})
export class WorkingDayInputComponent implements AfterViewInit {

  form: FormGroup;

  @ViewChild('select', { read: ViewContainerRef })
  private select: ViewContainerRef;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      'workingday': fb.control(''),
      'start': fb.control(''),
      'end': fb.control('')
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.select.element.nativeElement.focus();
    });
  }

  onSubmit() {
    console.log('submit', this.form.value);
  }


}
