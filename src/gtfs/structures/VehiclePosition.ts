import { parseDateFromLong } from "../../helpers";
import { Coordinates } from "../../rtti/types/apiParams";
import { RawPositionFeedEntity } from "../types/responses";
import { GTFSTrip, GTFSVehicle } from "./TripUpdate";

export class GTFSVehiclePosition {
  feedEntityID: string;
  trip: GTFSTrip;
  position: Coordinates;
  timestamp: Date;
  stopID: string;
  vehicle: GTFSVehicle;

  constructor(response: RawPositionFeedEntity) {
    this.feedEntityID = response.id;
    this.trip = new GTFSTrip(response.vehicle.trip);
    this.timestamp = parseDateFromLong(response.vehicle.timestamp);

    this.stopID = response.vehicle.stopId;
    // The vehicle.position property is in some unknown Position object
    // so just convert it to a vanilla object for safety
    this.position = {
      latitude: response.vehicle.position.latitude,
      longitude: response.vehicle.position.longitude,
    };
  }
}
