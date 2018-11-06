import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  template: `{{ value | date:'HH:mm' }}`
})
export class TimeCellRendererComponent implements ICellRendererAngularComp {
  value: any;

  agInit({value}): void {
    this.value = value;
  }

  refresh(): boolean {
    return false;
  }
}
