import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  template: `{{ value | date:'dd.MM.yyyy' }}`
})
export class DateCellRendererComponent implements ICellRendererAngularComp {
  value: any;

  agInit({value}): void {
    this.value = value;
  }

  refresh(): boolean {
    return false;
  }
}
