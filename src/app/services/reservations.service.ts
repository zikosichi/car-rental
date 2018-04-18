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

  /**
   * Get all reservations
   *
   * @returns {Observable<Reservation[]>}
   * @memberof ReservationsService
   */
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('http://external.novility.com:9050/car-rental/api/Reservations')
      .map((res: Reservation[]) => {
        res.forEach(r => {
          r.from = new Date(r.from);
          r.to = new Date(r.to);
        });
        return res;
      });
  }

  addReservation(reservation: Reservation): Observable<boolean> {
    return this.http.post<boolean>('http://external.novility.com:9050/car-rental/api/Reservations', reservation);
  }

}
