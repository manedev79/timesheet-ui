import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import localeDe from '@angular/common/locales/de';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import * as moment from 'moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkingDayInputComponent } from './create/working-day-input/working-day-input.component';
import { BreakInputComponent } from './create/break-input/break-input.component';
import { WorkingDayService } from './services/working-day.service';
import { WorkingDayListComponent } from './view/working-day-list/working-day-list.component';
import { ViewPageComponent } from './view/view-page/view-page.component';
import { CreatePageComponent } from './create/create-page/create.component';
import { HeaderComponent } from './header/header.component';
import { EditPageComponent } from './edit/edit-page/edit-page.component';
import { WorkingDayResolver } from './edit/workingday-resolver/workingday.resolver';
import { TimeCellRendererComponent } from './view/working-day-list/time-cell-renderer/time-cell-renderer.component';
import { DateCellRendererComponent } from './view/working-day-list/date-cell-renderer/date-cell-renderer.component';
import { YearSelectorComponent } from './view/year-selector/year-selector.component';
import { MonthSelectorComponent } from './view/month-selector/month-selector.component';
import { MonthDatePipe } from './view/month-pipe/month-pipe.pipe';
import { DurationCellRendererComponent } from './view/working-day-list/duration-cell-renderer/duration-cell-renderer.component';

moment.locale('de');
registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    WorkingDayInputComponent,
    BreakInputComponent,
    WorkingDayListComponent,
    ViewPageComponent,
    CreatePageComponent,
    HeaderComponent,
    EditPageComponent,
    TimeCellRendererComponent,
    DateCellRendererComponent,
    YearSelectorComponent,
    MonthSelectorComponent,
    MonthDatePipe,
    DurationCellRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([
      TimeCellRendererComponent,
      DateCellRendererComponent,
      DurationCellRendererComponent
    ])
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    WorkingDayService,
    WorkingDayResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
