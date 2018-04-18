import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

// Models
import { Reservation } from '../models/reservation';
import { environment } from '../../environments/environment';

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
    return this.http.get<Reservation[]>(`${environment.apiUrl}/Reservations`)
      .map((res: Reservation[]) => {
        res.forEach(r => {
          r.from = new Date(r.from);
          r.to = new Date(r.to);
        });
        return res;
      });
  }

  /**
   * Create new reservation
   *
   * @param {Reservation} reservation
   * @returns {Observable<Reservation>}
   * @memberof ReservationsService
   */
  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${environment.apiUrl}/Reservations`, reservation)
      .map((res: Reservation) => {
        res.from = new Date(res.from);
        res.to = new Date(res.to);
        return res;
      });
  }

  /**
   * Update reservation
   *
   * @memberof ReservationsService
   */
  updateReservation(reservation: Reservation): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiUrl}/Reservations/${reservation.id}`, reservation);
  }

  /**
   * Update reservation
   *
   * @memberof ReservationsService
   */
  deleteReservation(reservation: Reservation): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/Reservations/${reservation.id}`);
  }

}
