export class Reservation {
  id: number;
  carId: number;
  from: Date;
  to: Date;
  clientName: string;

  constructor(reservation) {
    this.id = reservation.id;
    this.carId = reservation.carId;
    this.from = new Date(reservation.from);
    this.to = new Date(reservation.to);
    this.clientName = reservation.clientName;
  }
}
