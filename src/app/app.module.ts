import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ReservationsService } from './services/reservations.service';
import { AddEditReservationComponent } from './components/add-edit-reservation/add-edit-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AddEditReservationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    ReservationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
