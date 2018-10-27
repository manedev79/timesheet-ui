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
import { WorkingDayInputComponent } from './create/working-day-input/working-day-input.component';
import { BreakInputComponent } from './create/break-input/break-input.component';
import { WorkingDayService } from './services/working-day.service';
import { WorkingDayListComponent } from './view/working-day-list/working-day-list.component';
import { ViewPageComponent } from './view/view-page/view-page.component';
import { CreatePageComponent } from './create/create-page/create.component';
import { HeaderComponent } from './header/header.component';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    WorkingDayInputComponent,
    BreakInputComponent,
    WorkingDayListComponent,
    ViewPageComponent,
    CreatePageComponent,
    HeaderComponent
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
