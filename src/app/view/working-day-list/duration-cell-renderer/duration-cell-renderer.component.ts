import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as moment from 'moment';

@Component({
  template: `{{ value }}`
})
export class DurationCellRendererComponent implements ICellRendererAngularComp {
  value: any;

  agInit({value}): void {
    this.value = moment
      .duration(value)
      .humanize();
  }

  refresh(): boolean {
    return false;
  }
}
