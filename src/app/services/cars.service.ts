import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

// Models
import { Car } from '../models/car';

@Injectable()
export class CarsService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get all cars
   *
   * @returns {Observable<Reservation[]>}
   * @memberof ReservationsService
   */
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('http://external.novility.com:9050/car-rental/api/Cars');
  }

}
