import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { Reservation } from '../../models/reservation';
import { Car } from '../../models/car';

// Services
import { CarsService } from '../../services/cars.service';
import { ReservationsService } from '../../services/reservations.service';


@Component({
  selector: 'app-add-edit-reservation',
  templateUrl: './add-edit-reservation.component.html',
  styleUrls: ['./add-edit-reservation.component.scss']
})
export class AddEditReservationComponent implements OnInit {

  @Input()
  reservation: Reservation = new Reservation();

  @Output()
  close = new EventEmitter();

  cars: Car[];

  constructor(
    private carsService: CarsService,
    private reservationsService: ReservationsService
  ) { }

  ngOnInit() {
    this.carsService.getCars().subscribe(res => {
      this.cars = res;
    });
  }

  /**
   * On modal close
   *
   * @memberof AddEditReservationComponent
   */
  onModalClose() {
    this.close.emit();
  }


  /**
   * Create new reservation
   *
   * @memberof AddEditReservationComponent
   */
  onCreateReservation() {
    this.reservationsService.addReservation(this.reservation).subscribe(res => {
      console.log(res);
    });
  }

}
