import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

// Models
import { Reservation } from '../models/reservation';

@Injectable()
export class ReservationsService {

  constructor(
    private http: HttpClient
  ) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('http://external.novility.com:9050/car-rental/api/Reservations')
      .map((res: Reservation[]) => {
        return res.map(r => new Reservation(r));
      });
  }

}
