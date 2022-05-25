import { parse } from "date-fns";
import { parseDateFromLong } from "../../helpers";
import {
  RawRealtimeFeedEntity,
  RawStopTimeEvent,
  RawStopTimeUpdate,
  RawTripDescriptor,
  RawVehicleDescriptor,
} from "../types/responses";

export class GTFSTripUpdate {
  feedEntityID: string;
  trip: GTFSTrip;
  stopTimeUpdates: GTFSStopTimeUpdate[];
  vehicle: GTFSVehicle;
  timestamp: Date;

  constructor(response: RawRealtimeFeedEntity) {
    this.feedEntityID = response.id;

    this.trip = new GTFSTrip(response.tripUpdate.trip);
    this.vehicle = new GTFSVehicle(response.tripUpdate.vehicle);
    this.timestamp = parseDateFromLong(response.tripUpdate.timestamp);
    this.stopTimeUpdates = response.tripUpdate.stopTimeUpdate.map(
      (u) => new GTFSStopTimeUpdate(u)
    );
  }
}

export class GTFSTrip {
  id: string;
  startDate: Date;
  routeID: string; // Refers to route in GTFS static data "routes.txt"
  directionID: number; // Refers to route in GTFS static data "routes.txt"

  constructor(response: RawTripDescriptor) {
    this.id = response.tripId;
    this.startDate = parse(response.startDate, "yyyyMMdd", new Date());
    this.routeID = response.routeId;
    this.directionID = response.directionId;
  }
}

export class GTFSVehicle {
  id: string;
  label: string;

  constructor(response: RawVehicleDescriptor) {
    this.id = response.id;
    this.label = response.label;
  }
}

export class GTFSStopTimeUpdate {
  stopSequence: number;
  arrival: GTFSStopTimeEvent;
  departure: GTFSStopTimeEvent;
  stopID: string;

  constructor(response: RawStopTimeUpdate) {
    this.stopSequence = response.stopSequence;
    this.arrival = new GTFSStopTimeEvent(response.arrival);
    this.departure = new GTFSStopTimeEvent(response.departure);
    this.stopID = response.stopId;
  }
}

export class GTFSStopTimeEvent {
  delay: number;
  time: Date;

  constructor(response: RawStopTimeEvent) {
    this.delay = response.delay;
    this.time = parseDateFromLong(response.time);
  }
}
