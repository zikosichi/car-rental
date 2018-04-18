import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddEditReservationComponent } from './components/add-edit-reservation/add-edit-reservation.component';

// Services
import { ReservationsService } from './services/reservations.service';
import { CarsService } from './services/cars.service';
import { CarDetailsComponent } from './components/car-details/car-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AddEditReservationComponent,
    CarDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [
    ReservationsService,
    CarsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
