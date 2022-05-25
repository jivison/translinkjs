import { cleanRouteNumber } from "../../helpers";
import { Coordinates } from "../types/apiParams";
import { RawStopDetails } from "../types/apiResponses";

export class StopDetails {
  stopNumber: number;
  name: string;
  bay?: number;
  city: string;
  onStreet: string;
  atStreet: string;
  coordinates: Coordinates;
  isWheelchairAccessible: boolean;
  routeNumbers: string[];

  constructor(response: RawStopDetails) {
    this.stopNumber = response.StopNo;
    this.name = response.Name.trim();
    this.city = response.City;
    this.onStreet = response.OnStreet;
    this.atStreet = response.AtStreet;
    this.isWheelchairAccessible = response.WheelchairAccess === 1;

    this.coordinates = {
      latitude: response.Latitude,
      longitude: response.Longitude,
    };

    this.routeNumbers = response.Routes.split(/\s+,\s+/).map((r) =>
      cleanRouteNumber(r.trim())
    );

    if (response.BayNo !== "N") {
      this.bay = parseInt(response.BayNo);
    }
  }
}

export class SearchStopDetails extends StopDetails {
  distanceFromSearch: number;

  constructor(raw: RawStopDetails) {
    super(raw);

    this.distanceFromSearch = raw.Distance;
  }
}
