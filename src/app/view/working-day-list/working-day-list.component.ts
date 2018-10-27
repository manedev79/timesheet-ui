import { Component, ViewChild} from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';
import { WorkingDay } from '../../model/working-day.model';

@Component({
  selector: 'app-workingday-list',
  templateUrl: './working-day-list.component.html',
  styleUrls: ['./working-day-list.component.scss']
})
export class WorkingDayListComponent {
  @ViewChild('grid')
  grid: AgGridNg2;

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
      headerName: 'Pausen',
      field: 'break',
      maxWidth: 100
    },
  ];

  rowData = <WorkingDay[]>[
      { day: '01.01.2018', start: '09:00', end: '18:00' },
      { day: '02.01.2018', start: '09:30', end: '17:30' },
      { day: '03.01.2018', start: '10:00', end: '17:00' },
  ];

  private fitGridToSize() {
    if (this.grid) {
      this.grid.api.sizeColumnsToFit();
    }
  }
}
