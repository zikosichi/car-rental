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

  startDate: Date = new Date();
  daysLength = 20;
  daysArray: Date[] = [];
  monthsArray: MonthItem[] = [];
  reservations: Reservation[] = [];
  isModalVisible = true;
  selectedReservation: Reservation;

  constructor(
    private reservationsService: ReservationsService
  ) {
    this.startDate.setDate(this.startDate.getDate() - 15);
  }

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
    });
  }

  /**
   * Generates an array of days
   * based on start date and days length
   *
   * @memberof CalendarComponent
   */
  generateDaysArray() {
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

  /**
   * On reservation create
   *
   * @memberof CalendarComponent
   */
  onReservationCreate(res: Reservation) {
    this.reservations.push(res);
    this.isModalVisible = false;
  }

  /**
   * Edit reservation
   *
   * @param {Reservation} reservation
   * @memberof CalendarComponent
   */
  editReservation(reservation: Reservation) {
    this.isModalVisible = true;
    this.selectedReservation = reservation;
  }

  /**
   * Close add/edit modal
   *
   * @memberof CalendarComponent
   */
  closeModal() {
    this.selectedReservation = null;
    this.isModalVisible = false;
  }

  /**
   * Check if day is reserved
   *
   * @param {Date} date
   * @param {Reservation} reservation
   * @returns
   * @memberof CalendarComponent
   */
  isDayReserved(date: Date, reservation: Reservation) {
    return this.roundDate(date) >= this.roundDate(reservation.from) &&
           this.roundDate(date) <= this.roundDate(reservation.to);
  }

  /**
   * Compares two dates with year-month-day
   *
   * @param {Date} date1
   * @param {Date} date2
   * @returns
   * @memberof CalendarComponent
   */
  isSameDay(date1: Date, date2: Date) {
    return this.roundDate(date1).toString() === this.roundDate(date2).toString();
  }


  /**
   * Rounds the date to days
   *
   * @private
   * @param {Date} date
   * @returns
   * @memberof CalendarComponent
   */
  private roundDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

}
