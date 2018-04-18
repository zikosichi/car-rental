import { Component, OnInit, Input } from '@angular/core';

// Models
import { Reservation } from '../../models/reservation';
import { Car } from '../../models/car';

// Services
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-add-edit-reservation',
  templateUrl: './add-edit-reservation.component.html',
  styleUrls: ['./add-edit-reservation.component.scss']
})
export class AddEditReservationComponent implements OnInit {

  @Input()
  reservation: Reservation = new Reservation();

  cars: Car[];

  constructor(
    private carsService: CarsService
  ) { }

  ngOnInit() {
    this.carsService.getCars().subscribe(res => {
      console.log(res);
      this.cars = res;
    });
  }

}
