import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

// Models
import { Car } from '../models/car';
import { environment } from '../../environments/environment';

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
    return this.http.get<Car[]>(`${environment.apiUrl}/Cars`);
  }

  /**
   * Get car details by id
   *
   * @param {number} id
   * @returns {Observable<Car[]>}
   * @memberof CarsService
   */
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${environment.apiUrl}/Cars/${id}`);
  }

}
