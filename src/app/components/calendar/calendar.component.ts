import { Component, OnInit } from '@angular/core';
import { detachEmbeddedView } from '@angular/core/src/view';
import * as _ from 'lodash';

// Modes
import { MonthItem } from '../models/month-item';

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
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor() { }

  ngOnInit() {
    this.generateDaysArray();
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
      return this.monthNames[m];
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

}
