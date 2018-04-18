import { Component, OnInit } from '@angular/core';
import { detachEmbeddedView } from '@angular/core/src/view';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  startDate: Date = new Date();
  daysLength = 20;
  daysArray: Date[] = [];

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
    for (let i = 0; i < this.daysLength; i++) {
      const nextDay = new Date();
      nextDay.setDate(this.startDate.getDate() + i);
      this.daysArray.push(nextDay);
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
