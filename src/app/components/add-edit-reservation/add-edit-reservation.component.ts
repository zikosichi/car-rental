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

  @Output()
  update = new EventEmitter();

  cars: Car[];
  formReservation: Reservation = new Reservation();

  constructor(
    private carsService: CarsService,
    private reservationsService: ReservationsService
  ) { }

  ngOnInit() {
    if (this.reservation) {
      this.formReservation = {...this.reservation};
    }

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
  createReservation(reservationForm: NgForm) {
    if (reservationForm.invalid) { return; }

    this.reservationsService.addReservation(this.formReservation).subscribe(res => {
      this.create.emit(res);
    });
  }

  /**
   * Delete reservation
   *
   * @param {NgForm} reservationForm
   * @memberof AddEditReservationComponent
   */
  deleteReservation() {

  }


  /**
   * Update Reservation
   *
   * @memberof AddEditReservationComponent
   */
  updateReservation(reservationForm: NgForm) {
    if (reservationForm.invalid) { return; }

    this.reservationsService.updateReservation(this.formReservation).subscribe(res => {
      this.update.emit(this.formReservation);
    });
  }



}
