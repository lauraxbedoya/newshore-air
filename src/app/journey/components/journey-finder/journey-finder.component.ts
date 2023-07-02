import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/services/flights.service';
import { Flight, Journey } from 'src/interfaces/flights.interface';
import { Currency, currencyList } from 'src/constants/common.constant';
import { formatCurrency } from 'src/utils/formatter.util';

@Component({
  selector: 'app-journey-finder',
  templateUrl: './journey-finder.component.html',
  styleUrls: ['./journey-finder.component.css']
})

export class JourneyFinderComponent {
  currencyList = currencyList;
  currency: string = currencyList[0].currency;
  title = 'Newshore Air';
  departureStation: string = '';
  arrivalStation: string = '';
  flights: Flight[] = [];
  maxFlights: string = '5';
  foundJorney?: Journey;
  priceExchange: number = 0;
  notFlightsFound = false;

  constructor(
    private _flightService: FlightService,
  ) { }

  async onSubmit() {
    this.cleanJourneyState();
    if (!this.validateForm()) return;

    if (!this.flights.length) {
      await this.getFlights();
      return;
    }

    this.findFlight();
  }

  findFlight() {
    if (this.flights.length) {

      const flightsWithScale = this.findFlightsWithScale();

      if (flightsWithScale?.length) {
        this.formatJourney(flightsWithScale);
        return;
      }
    }

    this.displayNotFlightsFound();
  }


  findFlightWithDestination(oldScales: Flight[]): (Flight[] | null) {
    if (oldScales.length >= Number(this.maxFlights)) return null;

    const usedPlaces = oldScales.map((flight) => flight.departureStation);
    const scaleFlights = this.flights.filter((flight: Flight) => flight.departureStation === oldScales[oldScales.length - 1].arrivalStation && !usedPlaces.includes(flight.departureStation));
    const foundDestinationFlight = scaleFlights.find((flight: Flight) => flight.arrivalStation === this.arrivalStation);

    if (foundDestinationFlight) {
      return [...oldScales, foundDestinationFlight];
    }

    for (let index = 0; index < scaleFlights.length; index++) {
      return this.findFlightWithDestination([...oldScales, scaleFlights[index]]);
    }

    return null;
  }

  findFlightsWithScale() {
    const directflight = this.flights.find((flight: Flight) => flight.arrivalStation === this.arrivalStation && flight.departureStation === this.departureStation);

    if (directflight) return [directflight];

    const flightsWitDesiredOrigin = this.flights.filter((flight: Flight) => flight.departureStation === this.
      departureStation);
    const scales: Flight[] = []

    for (let index = 0; index < flightsWitDesiredOrigin.length; index++) {
      const foundFlights = this.findFlightWithDestination([flightsWitDesiredOrigin[index]]);
      if (foundFlights?.length) {
        return foundFlights;
      }
    }

    return null;
  }


  formatJourney(flights: Flight[]) {
    const journey = {
      arrivalStation: this.arrivalStation,
      departureStation: this.departureStation,
      price: flights.reduce((prev, curr) => prev + curr.price, 0),
      flights
    };
    this.displayAvailableJourneys(journey);
  }

  displayAvailableJourneys(journey: Journey) {
    this.foundJorney = journey;
    const selectedCurrency = this.currencyList?.find((currency) => currency.currency === this.currency);
    this.priceExchange = selectedCurrency ? selectedCurrency.fromUSD * journey.price : journey.price;
  }

  displayNotFlightsFound() {
    this.notFlightsFound = true;
  }

  validateForm() {
    if (!this.departureStation || !this.arrivalStation) {
      alert('Orígen y Destino son requeridos')
      return false;
    }

    if (this.departureStation === this.arrivalStation) {
      alert('Los campos no pueden contener el mismo valor')
      return false;
    }
    return true;
  }

  async getFlights() {
    try {
      (await this._flightService.getFlight()).subscribe((data) => {
        this.flights = data;
        this.findFlight();
      })
    } catch (err) {
      console.error(err);
    }
  }

  formatCurrency = formatCurrency;

  cleanJourneyState() {
    this.foundJorney = undefined;
    this.priceExchange = 0;
    this.notFlightsFound = false;
  }
}
