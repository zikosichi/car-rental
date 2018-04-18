import { Component, OnInit } from '@angular/core';
import { detachEmbeddedView } from '@angular/core/src/view';
import * as _ from 'lodash';

// Modes
import { MonthItem } from '../models/month-item';
import { Reservation } from '../../models/reservation';

// Services
import { ReservationsService } from '../../services/reservations.service';

// Constants
import { monthNames } from '../constants/month-names';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  startDate: Date = new Date('2018-01-15');
  daysLength = 20;
  daysArray: Date[] = [];
  monthsArray: MonthItem[] = [];
  reservations: Reservation[] = [];

  constructor(
    private reservationsService: ReservationsService
  ) { }

  ngOnInit() {
    this.generateDaysArray();
    this.loadReservations();
  }

  /**
   * Load reservations from the API
   *
   * @memberof CalendarComponent
   */
  loadReservations() {
    this.reservationsService.getReservations().subscribe(res => {
      this.reservations = res;
      console.log(res);
    });
  }

  /**
   * Generates an array of days
   * based on start date and days length
   *
   * @memberof CalendarComponent
   */
  generateDaysArray(): void {
    this.daysArray = [];
    this.monthsArray = [];
    for (let i = 0; i < this.daysLength; i++) {
      // Generate days array
      const nextDay = new Date(this.startDate);
      nextDay.setDate(this.startDate.getDate() + i);
      this.daysArray.push(nextDay);
    }

    // Generate months array
    const months: number[] = this.daysArray.map(d => d.getMonth());
    const monthsObj = _.countBy(months, (m) => {
      return monthNames[m];
    });

    for (const key in monthsObj) {
      if (monthsObj.hasOwnProperty(key)) {
        this.monthsArray.push({
          monthName: key,
          colSpan: monthsObj[key] + 1
        });
      }
    }
  }

  /**
   * Moves calendar with one day left or right
   *
   * @param {('LEFT' | 'RIGHT')} direction
   * @memberof CalendarComponent
   */
  moveDays(direction: 'LEFT' | 'RIGHT'): void {
    this.startDate.setDate(this.startDate.getDate() - (direction === 'LEFT' ? 1 : -1));
    this.generateDaysArray();
  }

  isDayReserved(date: Date, reservation: Reservation) {
    return date > new Date(reservation.from) && date < new Date(reservation.to);
  }

}
