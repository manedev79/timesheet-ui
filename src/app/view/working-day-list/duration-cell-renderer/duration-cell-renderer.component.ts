import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as moment from 'moment';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  template: `{{ value }}`
})
export class DurationCellRendererComponent implements ICellRendererAngularComp {
  value: any;

  agInit(data: ICellRendererParams): void {
    const format = data['format'];
    const duration = moment.duration(data.value);
    this.value = this.formatDuration(duration, format ? format : 'HH:mm');
  }

  private formatDuration(duration: moment.Duration, format: string) {
    return moment.utc(duration.asMilliseconds()).format(format);
  }

  refresh(): boolean {
    return false;
  }
}
