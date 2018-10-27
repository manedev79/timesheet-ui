import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import localeDe from '@angular/common/locales/de';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkingDayInputComponent } from './working-day-input/working-day.component';
import { BreakInputComponent } from './break-input/break-input.component';
import { WorkingDayService } from './services/working-day.service';
import { WorkingDayListComponent } from './working-day-list/working-day-list.component';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    WorkingDayInputComponent,
    BreakInputComponent,
    WorkingDayListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    WorkingDayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
