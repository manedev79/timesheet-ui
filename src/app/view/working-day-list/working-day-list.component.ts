import { Component, ViewChild, Input, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import * as moment from 'moment';

import { WorkingDaySummary } from '../../model/working-day-summary.model';
import { TimeCellRendererComponent } from './time-cell-renderer/time-cell-renderer.component';
import { DateCellRendererComponent } from './date-cell-renderer/date-cell-renderer.component';

@Component({
  selector: 'app-workingday-list',
  templateUrl: './working-day-list.component.html',
  styleUrls: ['./working-day-list.component.scss']
})
export class WorkingDayListComponent implements OnChanges, AfterViewInit {
  @ViewChild('grid')
  private grid: AgGridNg2;

  @Input()
  rowData: WorkingDaySummary[] = [];

  gridOptions = <GridOptions>{
    enableColResize: true, // columns can be resized
    enableSorting: true, // enable sorting
    animateRows: true, // animate the sorting

    onFirstDataRendered: () => {
      // Use complete page size
      this.fitGridToSize();
    },

    onRowDoubleClicked: (event: RowDoubleClickedEvent) => {
      const rowData = event.data as WorkingDaySummary;
      const date = moment(rowData.day).format('YYYY-MM-DD');
      this.router.navigate(['edit', date]);
    }
  };

  columnDefs = [
    {
      headerName: 'Tag',
      field: 'day',
      maxWidth: 100,
      cellRendererFramework: DateCellRendererComponent
    },
    {
      headerName: 'Von',
      field: 'start',
      maxWidth: 100,
      cellRendererFramework: TimeCellRendererComponent
    },
    {
      headerName: 'Bis',
      field: 'end',
      maxWidth: 100,
      cellRendererFramework: TimeCellRendererComponent,
    },
    {
      headerName: 'Arbeitszeit',
      field: 'workSum',
      maxWidth: 130
    },
    {
      headerName: 'Pausensumme',
      field: 'breakSum',
      maxWidth: 130
    },
    {
      headerName: 'Beschreibung',
      field: 'description'
    }
  ];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.fitGridToSize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rowData) {
      this.fitGridToSize();
    }
  }

  private fitGridToSize() {
    if (this.grid && this.grid.api) {
      this.grid.api.sizeColumnsToFit();
    }
  }

}
