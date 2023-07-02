export interface Journey {
  departureStation: string;
  arrivalStation: string;
  price: number;
  flights: Flight[];
}

export interface Flight {
  departureStation: string;
  arrivalStation: string;
  price: number;
  flightCarrier: string;
  flightNumber: string;
}