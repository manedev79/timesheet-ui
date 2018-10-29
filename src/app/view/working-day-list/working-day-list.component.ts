import { Component, ViewChild, Input, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
import { WorkingDaySummary } from '../../model/working-day-summary.model';

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
    }
  };

  columnDefs = [
    {
      headerName: 'Tag',
      field: 'day',
      maxWidth: 100
    },
    {
      headerName: 'Von',
      field: 'start',
      maxWidth: 100
    },
    {
      headerName: 'Bis',
      field: 'end',
      maxWidth: 100
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