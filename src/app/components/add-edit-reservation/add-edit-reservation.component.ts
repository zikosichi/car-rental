import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  @Output()
  create = new EventEmitter();

  cars: Car[];
  isFormSubmitted = true;

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
  onCreateReservation(reservationForm: NgForm) {
    if (reservationForm.invalid) { return; }

    this.reservationsService.addReservation(this.reservation).subscribe(res => {
      this.create.emit(res);
    });
  }

}
