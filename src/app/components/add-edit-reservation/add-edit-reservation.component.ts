import { Component, OnInit, Input } from '@angular/core';

// Models
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-add-edit-reservation',
  templateUrl: './add-edit-reservation.component.html',
  styleUrls: ['./add-edit-reservation.component.scss']
})
export class AddEditReservationComponent implements OnInit {

  @Input()
  reservation: Reservation;

  constructor() { }

  ngOnInit() {
    
  }

}
