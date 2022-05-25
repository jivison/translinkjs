import { cleanRouteNumber, parseTime } from "../helpers";
import { Coordinates } from "../types/apiParams";
import { RawBusDetails, RouteDirection } from "../types/apiResponses";

export class BusDetails {
  vehicleNumber: string;
  tripID: string;
  routeNumber: string;
  direction: RouteDirection;
  patternID: string;
  coordinates: Coordinates;
  recordedAt: Date;
  routeMapURL: string;

  constructor(response: RawBusDetails) {
    this.vehicleNumber = response.VehicleNo;
    this.tripID = `${response.TripId}`;
    this.routeNumber = cleanRouteNumber(response.RouteNo);
    this.direction = response.Direction;
    this.patternID = response.Pattern;
    this.recordedAt = parseTime(response.RecordedTime);
    this.routeMapURL = response.RouteMap.Href;

    this.coordinates = {
      latitude: response.Latitude,
      longitude: response.Longitude,
    };
  }
}
