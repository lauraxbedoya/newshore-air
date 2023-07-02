import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Flight } from "src/interfaces/flights.interface";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FlightService {
  constructor(
    private http: HttpClient
  ) { }

  baseUrl = `${environment.apiBaseUrl}flights`;

  headers: HttpHeaders = new HttpHeaders()
    .set('content-type', 'application/json')

  async getFlight(level: 0 | 1 | 2 = 2) {
    return this.http.get<Flight[]>(`${this.baseUrl}/${level}`, {
      headers: this.headers
    });
  }
}